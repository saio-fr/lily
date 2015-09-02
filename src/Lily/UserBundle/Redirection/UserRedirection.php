<?php

namespace Lily\UserBundle\Redirection;

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Cookie;

use \Firebase\JWT\JWT;

class UserRedirection implements AuthenticationSuccessHandlerInterface
{
    private $router;
    private $security;

    public function __construct(RouterInterface $router, SecurityContext $security, $container){
        $this->router = $router;
        $this->security = $security;
        $this->container = $container;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token){

        $user = $this->security->getToken()->getUser();
        $session = $request->getSession();

        // Create a jwt token to authentificate for our next nodejs Project
        $jwtToken = array(
            "iss" => "saio.fr",
            "aud" => $user->getUsername(),
            "iat" => time(),
            "jti" => uniqid(),
            "licence" => $user->getClient()->getLicence(),
            "firstname" => $user->getFirstname(),
            "lastname" => $user->getLastname(),
            "email" => $user->getEmail(),
            "roles" => $user->getRoles()
        );

        $jwt = JWT::encode($jwtToken, "C1F164C84C89C51E57A7BD8FBDA36");

        if ($this->security->isGranted('ROLE_SUPER_ADMIN')) {
            $redirection = new RedirectResponse($this->router->generate('lily_admin'));
        } else {
            $redirection = new RedirectResponse($this->router->generate('lily_dashboard'));

            // identify user to analytics
            $analytics = $this->container->get('analytics');
            $analytics->identify($user);
        }

        $redirection->headers->setCookie(new Cookie('_saio', $jwt));
        $redirection->send();
    }
}
