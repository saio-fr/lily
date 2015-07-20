<?php

namespace Lily\KnowledgeBundle\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Command\Guzzle\Description;
use GuzzleHttp\Command\Guzzle\GuzzleClient;
use GuzzleHttp\Subscriber\Log\LogSubscriber;

class SynapseClient extends GuzzleClient
{
    public function __construct()
    {

        // initialisation du client standard Guzzle
        $client = new Client([
            "defaults" => [
                // headers attendus par MaTpe
                "headers" => [
                    "Accept-Encoding" => "gzip, deflate",
                    "Content-Type" => "application/json; charset=utf-8"
                ],
            ]
        ]);

        $client->getEmitter()->attach(new LogSubscriber());

        // définition des requètes supportées par notre service
        $description = new Description([
            "name" => 'Synapse',
            "description" => "API smartFAQ synapse",
            'baseUrl' => 'http://search.saio.fr/api/saio/smartfaq/SmartFAQWCF.svc/rest/',
            // list des opérations supportées
            "operations" => [
                "addquestionanswer" => [
                    "httpMethod" => "POST",
                    "uri" => "addquestionanswer",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ],
                ],
                "addadditionalquestion" => [
                    "httpMethod" => "POST",
                    "uri" => "addadditionalquestion",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ],
                ],
                "updatequestion" => [
                    "httpMethod" => "POST",
                    "uri" => "updatequestion",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "updateanswer" => [
                    "httpMethod" => "POST",
                    "uri"=> "updateanswer",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "removequestion" => [
                    "httpMethod" => "POST",
                    "uri"=> "removequestion",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "removeanswer" => [
                    "httpMethod" => "POST",
                    "uri"=> "removeanswer",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "buildindex" => [
                    "httpMethod" => "POST",
                    "uri"=> "buildindex",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "resetdata" => [
                    "httpMethod" => "POST",
                    "uri"=> "ResetData",
                    "parameters" => [
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ]
            ]
        ]);

        parent::__construct($client, $description);
    }
}
