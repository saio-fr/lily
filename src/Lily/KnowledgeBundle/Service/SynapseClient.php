<?php
 
namespace Lily\KnowledgeBundle\Service;
 
use GuzzleHttp\Client;
use GuzzleHttp\Command\Guzzle\Description;
use GuzzleHttp\Command\Guzzle\GuzzleClient;
 
 
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
 
        // définition des requètes supportées par notre service
        $description = new Description([
            "name" => 'Synapse',
            "description" => "API smartFAQ synapse",
            'baseUrl' => 'http://search.saio.fr/api/',
            // list des opérations supportées
            "operations" => [
                "addquestionanswer" => [
                    "httpMethod" => "POST",
                    "uri" => "{licence}/smartfaq/SmartFAQWCF.svc/rest/addquestionanswer",
                    "parameters" => [
                        "licence" => [
                            "type" => "string",
                            "location" => "uri"
                        ],
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ],
                ],
                "addadditionalquestion" => [
                    "httpMethod" => "POST",
                    "uri" => "{licence}/smartfaq/SmartFAQWCF.svc/rest/addadditionalquestion",
                    "parameters" => [
                        "licence" => [
                            "type" => "string",
                            "location" => "uri"
                        ],
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ],
                ],
                "updatequestion" => [
                    "httpMethod" => "POST",
                    "uri" => "{licence}/smartfaq/SmartFAQWCF.svc/rest/updatequestion",
                    "parameters" => [
                        "licence" => [
                            "type" => "string",
                            "location" => "uri"
                        ],
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "updateanswer" => [
                    "httpMethod" => "POST",
                    "uri"=> "{licence}/smartfaq/SmartFAQWCF.svc/rest/updateanswer",
                    "parameters" => [
                        "licence" => [
                            "type" => "string",
                            "location" => "uri"
                        ],
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "removequestion" => [
                    "httpMethod" => "POST",
                    "uri"=> "{licence}/smartfaq/SmartFAQWCF.svc/rest/removequestion",
                    "parameters" => [
                        "licence" => [
                            "type" => "string",
                            "location" => "uri"
                        ],
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "removeanswer" => [
                    "httpMethod" => "POST",
                    "uri"=> "{licence}/smartfaq/SmartFAQWCF.svc/rest/removeanswer",
                    "parameters" => [
                        "licence" => [
                            "type" => "string",
                            "location" => "uri"
                        ],
                        "request" => [
                            "type" => "string",
                            "location" => "body"
                        ]
                    ]
                ],
                "buildindex" => [
                    "httpMethod" => "POST",
                    "uri"=> "{licence}/smartfaq/SmartFAQWCF.svc/rest/buildindex",
                    "parameters" => [
                        "licence" => [
                            "type" => "string",
                            "location" => "uri"
                        ],
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