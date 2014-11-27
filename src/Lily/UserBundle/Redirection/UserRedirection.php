<?php
	
namespace Lily\UserBundle\Redirection;

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\RedirectResponse;

class UserRedirection implements AuthenticationSuccessHandlerInterface
{
    private $router;
    private $security;

    public function __construct(RouterInterface $router, SecurityContext $security){
        $this->router = $router;
        $this->security = $security;   
    }
    
    public function onAuthenticationSuccess(Request $request, TokenInterface $token){
        if ($this->security->isGranted('ROLE_SUPER_ADMIN')) {
            $redirection = new RedirectResponse($this->router->generate('lily_admin'));
        } else $redirection = new RedirectResponse($this->router->generate('lily_dashboard'));
        
        return $redirection;
    }
}