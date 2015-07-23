<?php

namespace Lily\KnowledgeBundle\Service;

use Lily\KnowledgeBundle\Service\SynapseClient;

Class SynapseConnector {

    public $client;

    public function __construct(SynapseClient $synapse)
    {
        $this->synapse = $synapse;
    }

    public function addQuestionAnswer($client, $question) {

        $licence = $client->getLicence();

        $json = json_encode(array(
            "answer" => array(
                "id" => "r_".$question->getId(),
                "text" => strip_tags($question->getAnswer())),
            "credentials" => array(
                "password" => $client->getSynapsePassword(),
                "user" => $licence),
            "question" => array(
                "id" => "q_".$question->getId()."_0",
                "text" => strip_tags($question->getTitle()))
        ));

        $res = $this->synapse->addquestionanswer([
            "request" => $json
        ]);
    }

    public function updateQuestionAnswer($client, $question) {

        $licence = $client->getLicence();

        // Update Question
        $json = json_encode(array(
            "credentials" => array(
                "password" => $client->getSynapsePassword(),
                "user" => $licence),
            "item" => array(
                "id" => "q_".$question->getId()."_0",
                "text" => strip_tags($question->getTitle()))
        ));

        $res = $this->synapse->updatequestion([
            "licence" => $licence,
            "request" => $json
        ]);

        // Update answer
        $json = json_encode(array(
            "credentials" => array(
                "password" => $client->getSynapsePassword(),
                "user" => $licence),
            "item" => array(
                "id" => "r_".$question->getId(),
                "text" => strip_tags($question->getAnswer()))
        ));

        $res = $this->synapse->updateanswer([
            "request" => $json
        ]);

    }

    public function removeAnswer($client, $question) {

        $licence = $client->getLicence();

        // Update answer
        $json = json_encode(array(
            "credentials" => array(
                "password" => $client->getSynapsePassword(),
                "user" => $licence),
            "id" => "r_".$question->getId()
        ));

        $res = $this->synapse->removeanswer([
            "request" => $json
        ]);

    }

    public function addAdditionalQuestion($client, $alt) {

        $licence = $client->getLicence();

        // Update Question
        $json = json_encode(array(
            "credentials" => array(
                "password" => $client->getSynapsePassword(),
                "user" => $licence),
            "question" => array(
                "id" => "q_".$alt->getQuestion()->getId()."_".$alt->getId(),
                "text" => strip_tags($alt->getTitle()),
                "answerId" => "r_".$alt->getQuestion()->getId()
            ),
        ));

        $res = $this->synapse->addadditionalquestion([
            "request" => $json
        ]);
    }

    public function updateQuestion($client, $alt) {

        $licence = $client->getLicence();

        // Update Question
        $json = json_encode(array(
            "credentials" => array(
                "password" => $client->getSynapsePassword(),
                "user" => $licence),
            "item" => array(
                "id" => "q_".$alt->getQuestion()->getId()."_".$alt->getId(),
                "text" => strip_tags($alt->getTitle()))
        ));

        $res = $this->synapse->updatequestion([
            "request" => $json
        ]);
    }

    public function removeQuestion($client, $alt) {

        $licence = $client->getLicence();

        // Update Question
        $json = json_encode(array(
            "credentials" => array(
                "password" => $client->getSynapsePassword(),
                "user" => $licence),
            "id" => "q_".$alt->getQuestion()->getId()."_".$alt->getId()
        ));

        $res = $this->synapse->removequestion([
            "request" => $json
        ]);
    }

    public function resetData($client) {

        $licence = $client->getLicence();

        // Update Question
        $json = json_encode(array(
            "password" => $client->getSynapsePassword(),
            "user" => $licence
        ));

        $res = $this->synapse->resetdata([
            "request" => $json
        ]);
    }

    public function buildIndex($client) {

        $licence = $client->getLicence();

        $json = json_encode(array(
            "password" => $client->getSynapsePassword(),
            "user" => $licence
        ));

        $res = $this->synapse->buildindex([
            "request" => $json
        ]);
    }

    public function getIndexStatus($client) {

        $licence = $client->getLicence();

        $json = json_encode(array(
            "password" => $client->getSynapsePassword(),
            "user" => $licence
        ));

        $res = $this->synapse->indexstatus([
            "request" => $json
        ]);
    }

}
