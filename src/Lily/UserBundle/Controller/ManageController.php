<?php

namespace Lily\UserBundle\Controller;

use Lily\UserBundle\Entity\User;
use Lily\UserBundle\Form\UserType;
use Lily\BackOfficeBundle\Controller\BaseController;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Filesystem\Filesystem;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\View\ViewHandler;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Exception\RuntimeException;
use JMS\SecurityExtraBundle\Annotation\Secure;

class ManageController extends BaseController
{
    /**
     * @View()
     * @Secure(roles="ROLE_ADMIN")
     */
    public function indexAction() {
    }

    /**
     * @Get("/rest/")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUsersAction() {
        $enterprise = $this->getUser()->getEnterprise();
        $userList = $enterprise->getUsers();
        return $userList;
    }

    /**
     * @Get("/rest/maxusers")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getMaxusersAction() {
        $enterprise = $this->getUser()->getEnterprise();
        $data=[];
        $data['maxusers'] = $enterprise->getMaxusers();
        return $data;
    }


    /**
     * @Delete("/rest/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function delAction($id) {
    
        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($user === null || $user->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        if($user === $this->getUser()) {
            throw new \Exception("You cannot delete your own account.");
        }
		
       $manager->deleteUser($user);
       
    }

    /**
     * @Put("/rest/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function editAction($id, Request $request) {
    
        $data = json_decode($request->getContent(), true);

        $manager = $this->get('fos_user.user_manager');
        $user = $manager->findUserBy(Array('id' => $id));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($user === null || $user->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }


        $form = $this->createForm(new UserType, $user, array('adminModif'=>true, 'csrf_protection' => false));
        $form->bind($data);

        if($user === $this->getUser() && !in_array('ROLE_ADMIN', $user->getRoles())) {
            throw new \Exception("You can't delete admin rules on your own account");
        }

        // Manage the avatar
        $this->updateAvatar($user);
        $manager->updateUser($user);
        
        $view = $this->view($user)->setFormat('json');
		return $this->handleView($view);
     
    }

    /**
     * @Post("/rest")
     * @Secure(roles="ROLE_ADMIN")
     * @View(statusCode=204)
     */
    public function addAction(Request $request) {
    
        $enterprise = $this->getEnterprise();
        $maxusers = $enterprise->getMaxusers();
        $users = $enterprise->getUsers();
        
        if(count($users) >= $maxusers)
            throw new \Exception("User limit reached.");

        $data = json_decode($request->getContent(), true);

        $manager = $this->get('fos_user.user_manager');
        $new = $manager->createUser();

        $form = $this->createForm(new UserType, $new, array('adminModif'=>true, 'csrf_protection' => false));
        $form->bind($data);

        //Gestion avatar
        $new->setEnabled(true);
        $new->setEnterprise($enterprise);
        $this->updateAvatar($new);

        $manager->updateUser($new);
        
        $view = $this->view($new)->setFormat('json');
		return $this->handleView($view);

    }

    /**
     * @Get("/rest/userForm")
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getUserFormAction() {
    
        $userForm = $this->createForm(new UserType, null, array('adminModif' => true));
        
        return $this->render('LilyUserBundle:Manage:Users/edit.html.twig', array('form' => $userForm->createView()));
        
    }

    public function avatarWidgetAction($id, Request $request) {
    
        $urlGenerator=$this->get('templating.helper.assets');

        $errors = [];

        /* Récupération de l'user (null si création) */
        if ($id == 0) {
            $user = null;
        } else {
        
            $manager = $this->get('fos_user.user_manager');
            $user = $manager->findUserBy(array('id' => $id));

            //Security check
            $enterprise = $this->getEnterprise();
            if($user === null || $user->getEnterprise() !== $enterprise) {
                throw $this->createNotFoundException();
            }
            
        }

        /* Création du formulaire */
        $form = $this->createForm(new UserType, $user, array('avatarWidget' =>true));

        /* Traitement de l'envoi d'un nouvel avatar */
        if ($request->getMethod() == 'POST') {
        
            $form->handleRequest($request);
		
            $tmpAvatar = $this->uploadTmpAvatar($user, $form->get('avatarFile')->getData());
            $tmpAvatarUrl = $urlGenerator->getUrl($tmpAvatar);

            // Recréation du formulaire (on vient de le soumettre)
            $form = $this->createForm(new UserType, $user, array('avatarWidget' => true));
            $form->get('avatar')->setData($tmpAvatarUrl);
                
            
        } else if($id==0) {
        
            $tmpAvatarUrl = $urlGenerator->getUrl('images/avatar-utilisateur.png');
            $form->get('avatar')->setData($tmpAvatarUrl);
            
        }

        return $this->render('LilyUserBundle:Manage:Users/avatarWidget.html.twig', array('form' => $form->createView(), 'errors' => $errors));
        
    }

    // Upload le fichier temporaire lié à l'avatar servant à la prévisualisation
    private function uploadTmpAvatar($user, $avatarFile) {
        $enterprise = $this->getUser()->getEnterprise();

        if ($avatarFile === null) { // Pas de fichier à uploader
            return;
        }

        if ($user !== null) { // L'utilisateur existe

            $tmpAvatarFileName = $user->getId() . '.' . $avatarFile->guessExtension();
            $tmpAvatar = User::getTmpUploadDir($enterprise) . $tmpAvatarFileName;
            $user->setTmpAvatar($tmpAvatar);
			
        } else { // L'utilisateur n'existe pas encore (création d'un compte utilisateur)

            $tmpAvatarFileName = 'new-user' . '.' . $avatarFile->guessExtension();
            $tmpAvatar = User::getTmpUploadDir($enterprise) . $tmpAvatarFileName;

        }

        // On déplace le fichier envoyé dans le répertoire d'upload temporaire
        $avatarFile->move(User::getTmpUploadRootDir($enterprise),   // Répertoire de destination
                                    $tmpAvatarFileName); // Nom du fichier

        return $tmpAvatar;
    }

    private function updateAvatar($user) {
        if(preg_match('#^/customer/' . $user->getEnterprise()->getCname() . '/images/avatars/tmp/[0-9]+\.[a-zA-Z]+$#', $user->getAvatar())) {
            $urlGenerator = $this->get('templating.helper.assets');


            $newAvatarRelativeUrl=str_replace('/tmp/', '/', $user->getAvatar());
            $newAvatarAbsoluteUrl=$urlGenerator->getUrl($newAvatarRelativeUrl);

            $fs = new Filesystem();
            $fs->copy('.'.$user->getAvatar(), '.'.$newAvatarRelativeUrl);


            $user->setAvatar($newAvatarAbsoluteUrl);
        }
    }

    /**
     * @Get("/rest/userStats/footer/{id}/{start}/{end}", requirements={"id" = "\d+", "start" = "\d+", "end" = "\d+"})
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getStatsFooterAction($id, $start, $end) {
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $id));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        $logChatRepository = $this->getDoctrine()
                                  ->getManager('dev')
                                  ->getRepository('LilyChatBundle:LogChat');

        $userId = $selectedUser->getId();

        $startTimestamp = $start/1000;
        $endTimestamp = $end/1000;
        $userStats = [];
        $userStats['averageNumberOfConversation'] = $logChatRepository->hourlyNumberOfConversation($userId, $startTimestamp, $endTimestamp);
        $userStats['averageConversationTime'] = $logChatRepository->averageConversationTime($userId, $startTimestamp, $endTimestamp);
        $userStats['averageWaited'] = $logChatRepository->averageWaited($userId, $startTimestamp, $endTimestamp);
        $userStats['averageSatisfaction'] = $logChatRepository->averageSatisfaction($userId, $startTimestamp, $endTimestamp);
        $userStats['averageActivity'] = "Non calculée";

        return $userStats;
    }

    /**
     * @Get("/rest/userStats/{id}/graph/{type}/{start}/{end}", requirements={"id" = "\d+", "type"="numberOfConversation|conversationTime|waited|satisfaction", "start" = "\d+", "end" = "\d+"})
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getStatsAction($type, $id, $start, $end) {
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $id));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        //Convert the microtimestamp to timestamp and then Datetime.
        $timestampStart = round($start/1000);
        $timestampEnd = round($end/1000);

        $from = new \Datetime();
        $from->setTimestamp($timestampStart);

        $to = new \Datetime();
        $to->setTimestamp($timestampEnd);

        //$diff is in days
        $diff = $to->diff($from)->format('%a');

        // Parameters
        if($diff <= 1) {
            $intervalSize = 1*60*60;    // (1 hour)     // interval in second between 2 points (here 1 hour)
            $step = 2;                                  // interval between 2 legend on x axis
            $period = 'hour';                           // unit
        } elseif($diff <= 7) {
            $intervalSize = 1*24*60*60; // (1 day)
            $step = 1;
            $period = 'day';
        } elseif($diff <= 40) {
            $intervalSize = 1*24*60*60; // (1 days)
            $step = 4;
            $period = 'day';
        } elseif($diff <= 64) {
            $intervalSize = 2*24*60*60;  // (2 days)
            $step = 4;
            $period = 'day';
        } elseif($diff <= 385) {
            $intervalSize = 1*31*24*60*60; // (1 month)
            $step = 1;
            $period = 'month';
        } else {
            $intervalSize = 1*31*24*60*60; // (1 month)
            $step = 4;
            $period = 'month';
        }


        $logChatRepository = $this->getDoctrine()
                                  ->getManager('dev')
                                  ->getRepository('LilyChatBundle:LogChat');

        $userId=$selectedUser->getId();

        switch($type) {
            case "numberOfConversation":
                $data = $logChatRepository->hourlyNumberOfConversation($userId, $timestampStart, $timestampEnd, $intervalSize);
            break;
            case "conversationTime":
                $data = $logChatRepository->averageConversationTime($userId, $timestampStart, $timestampEnd, $intervalSize); //["period"=>"day","step"=>4,"values"=>[["1406206015000","0"],["1406033215000","2"],["1405860415000","0"],["1405687615000","1"],["1405514815000","1"],["1405342015000","0"],["1405169215000","1"],["1404996415000","1"],["1404823615000","0"],["1404650815000","3"],["1404478015000","9"],["1404305215000","0"],["1404132415000","0"],["1403959615000","3"],["1403786815000","2"]]];
            break;
            case "waited":
                $data = $logChatRepository->averageWaited($userId, $timestampStart, $timestampEnd, $intervalSize); //["period"=>"day","step"=>4,"values"=>[["1406206015000","0"],["1406033215000","2"],["1405860415000","0"],["1405687615000","1"],["1405514815000","1"],["1405342015000","0"],["1405169215000","1"],["1404996415000","1"],["1404823615000","0"],["1404650815000","3"],["1404478015000","9"],["1404305215000","0"],["1404132415000","0"],["1403959615000","3"],["1403786815000","2"]]];
            break;
            case "satisfaction":
                $data = $logChatRepository->averageSatisfaction($userId, $timestampStart, $timestampEnd, $intervalSize); //["period"=>"day","step"=>4,"values"=>[["1406206015000","0"],["1406033215000","2"],["1405860415000","0"],["1405687615000","1"],["1405514815000","1"],["1405342015000","0"],["1405169215000","1"],["1404996415000","1"],["1404823615000","0"],["1404650815000","3"],["1404478015000","9"],["1404305215000","0"],["1404132415000","0"],["1403959615000","3"],["1403786815000","2"]]];
            break;
            default:
               throw $this->createNotFoundException();
            break;
        }

        foreach($data as $entry) {
            $nonzeroData[$entry["intervalId"]]=$entry["value"];
        }


        $graphData = [];
        for($n = round($timestampStart/$intervalSize); $n < round($timestampEnd/$intervalSize); $n++) {

            $graphData[] = [(string) ($n*$intervalSize*1000),   //x value: microtimestamp
                            (string) (isset($nonzeroData[$n]) ? $nonzeroData[$n] : 0)];  //y value : data
        }
        $graphData = array_reverse($graphData);
        return ['type' => $type,
                'period' => $period,
                'step' => $step,
                'values' => $graphData];
    }

    /**
     * @Get("/rest/conversationHistory/{operator}", requirements={"operator" = "\d+"})
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getConversationsAction($operator) {
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $operator));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        return  [
            ['id'=> 1, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 621', 'endTime' => 1406649334, 'startTime' => 1406648334, 'redirect' => false, 'blocked' => false, 'satisfaction'=>true],
            ['id'=> 2, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 622', 'endTime' => 1406698354, 'startTime' => 1406648334, 'redirect' => 13, 'blocked' => true, 'satisfaction'=>true],
            ['id'=> 3, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 623', 'endTime' => 1406649344, 'startTime' => 1406648787, 'redirect' => false, 'blocked' => false, 'satisfaction'=>null],
            ['id'=>10, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 648', 'endTime' => 1406649384, 'startTime' => 1406644894, 'redirect' => 13, 'blocked' => false, 'satisfaction'=>false],
            ['id'=>21, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 650', 'endTime' => 1406649334, 'startTime' => 1406648454, 'redirect' => false, 'blocked' => false, 'satisfaction'=>true],
            ['id'=>24, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 653', 'endTime' => 1406649374, 'startTime' => 1406648123, 'redirect' => false, 'blocked' => false, 'satisfaction'=>false],
        ];
    }
    /**
     * @Get("/rest/conversationHistory/conversation/{conversationId}", requirements={"operator" = "\d+", "conversationId" = "\d+" })
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getConversationDetailAction($conversationId) {
        $userManager = $this->get('fos_user.user_manager');

/*        $selectedUser = $userManager->findUserBy(Array('id' => $operator));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }*/

        return  [
            "conversationId" => $conversationId,
            "startTime" => 1406648334,
            "interlocutors" => [
                                    0 => ["type"=>"operator", "id"=>10],
                                    1 => ["type"=>"user", "name"=>"User 625"]
                                ],
            "messages" => [
                ["time"=>1406648334, "interlocutor"=>0, "content"=>"Bonjour, comment puis-je vous aider ?"],
                ["time"=>1406648342, "interlocutor"=>1, "content"=>"Bonjour,"],
                ["time"=>1406648362, "interlocutor"=>1, "content"=>"Je cherche à savoir combien de cheveux possède M. Peychès"],
                ["time"=>1406648389, "interlocutor"=>0, "content"=>"Oh, c'est une question très simple :"],
                ["time"=>1406648400, "interlocutor"=>0, "content"=>"Il n'en a pas !"],
            ]
        ];
    }


    /**
     * @Get("/rest/knowledgeBase/{operator}", requirements={"operator" = "\d+"})
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getKnowledgeBaseHistoryAction($operator) {
        $userManager = $this->get('fos_user.user_manager');
        $selectedUser = $userManager->findUserBy(Array('id' => $operator));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }

        return  [
            ['id'=> 1, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 621', 'endTime' => 1406649334, 'startTime' => 1406648334, 'redirect' => false, 'blocked' => false, 'satisfaction'=>true],
            ['id'=> 2, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 622', 'endTime' => 1406698354, 'startTime' => 1406648334, 'redirect' => 13, 'blocked' => true, 'satisfaction'=>true],
            ['id'=> 3, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 623', 'endTime' => 1406649344, 'startTime' => 1406648787, 'redirect' => false, 'blocked' => false, 'satisfaction'=>null],
            ['id'=>10, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 648', 'endTime' => 1406649384, 'startTime' => 1406644894, 'redirect' => 13, 'blocked' => false, 'satisfaction'=>false],
            ['id'=>21, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 650', 'endTime' => 1406649334, 'startTime' => 1406648454, 'redirect' => false, 'blocked' => false, 'satisfaction'=>true],
            ['id'=>24, 'conversationName'=>'Sans titre', 'interlocutor'=>'User 653', 'endTime' => 1406649374, 'startTime' => 1406648123, 'redirect' => false, 'blocked' => false, 'satisfaction'=>false],
        ];
    }
    /**
     * @Get("/rest/knowledgeBase/question/{question}", requirements={"operator" = "\d+", "question" = "\d+" })
     *
     * @Secure(roles="ROLE_ADMIN")
     */
    public function getQuestionDetailAction($question) {
        $userManager = $this->get('fos_user.user_manager');

/*        $selectedUser = $userManager->findUserBy(Array('id' => $operator));

        //Security check
        $enterprise = $this->getUser()->getEnterprise();
        if($selectedUser === null || $selectedUser->getEnterprise() !== $enterprise) {
            throw $this->createNotFoundException();
        }*/

        return [
            "question" => $question,
            "startTime" => 1406648334,
            "interlocutors" => [
                0 => ["type"=>"operator", "id"=>10],
                1 => ["type"=>"user", "name"=>"User 625"]
            ],
            "messages" => [
                ["time"=>1406648334, "interlocutor"=>0, "content"=>"Bonjour, comment puis-je vous aider ?"],
                ["time"=>1406648342, "interlocutor"=>1, "content"=>"Bonjour,"],
                ["time"=>1406648362, "interlocutor"=>1, "content"=>"Je cherche à savoir combien de cheveux possède M. Peychès"],
                ["time"=>1406648389, "interlocutor"=>0, "content"=>"Oh, c'est une question très simple :"],
                ["time"=>1406648400, "interlocutor"=>0, "content"=>"Il n'en a pas !"],
            ]
        ];
    }
}
