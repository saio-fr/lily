<?php
namespace Lily\BackOfficeBundle\DoctrineFunction;

use Doctrine\ORM\Query\AST\Functions\FunctionNode;
use Doctrine\ORM\Query\Lexer;
use Doctrine\ORM\Query\SqlWalker;
use Doctrine\ORM\Query\Parser;

/**
 * TimeToSecFunction ::= "time_to_sec" "(" ArithmeticExpression ")"
 */
class TimeToSec extends FunctionNode
{
    public $time = null;

    public function parse(\Doctrine\ORM\Query\Parser $parser)
    {
        $parser->match(Lexer::T_IDENTIFIER);
        $parser->match(Lexer::T_OPEN_PARENTHESIS);
        $this->time = $parser->ArithmeticExpression();
        $parser->match(Lexer::T_CLOSE_PARENTHESIS);
    }

    public function getSql(\Doctrine\ORM\Query\SqlWalker $sqlWalker)
    {
        return 'TIME_TO_SEC(' .
            $this->time->dispatch($sqlWalker) . 
        ')';
    }
}