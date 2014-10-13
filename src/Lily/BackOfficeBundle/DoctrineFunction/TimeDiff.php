<?php
namespace Lily\BackOfficeBundle\DoctrineFunction;

use Doctrine\ORM\Query\AST\Functions\FunctionNode;
use Doctrine\ORM\Query\Lexer;
use Doctrine\ORM\Query\SqlWalker;
use Doctrine\ORM\Query\Parser;

/**
 * TimeDiffFunction ::= "TIMEDIFF" "(" ArithmeticExpression "," ArithmeticExpression ")"
 */
class TimeDiff extends FunctionNode
{
    public $firstDateTime = null;
    public $secondDateTime = null;

    public function parse(\Doctrine\ORM\Query\Parser $parser)
    {
        $parser->match(Lexer::T_IDENTIFIER);
        $parser->match(Lexer::T_OPEN_PARENTHESIS);
        $this->firstDateTime = $parser->ArithmeticExpression();
        $parser->match(Lexer::T_COMMA);
        $this->secondDateTime = $parser->ArithmeticExpression();
        $parser->match(Lexer::T_CLOSE_PARENTHESIS);
    }

    public function getSql(\Doctrine\ORM\Query\SqlWalker $sqlWalker)
    {
        return 'TIMEDIFF(' .
            $this->firstDateTime->dispatch($sqlWalker) . ', ' .
            $this->secondDateTime->dispatch($sqlWalker) .
        ')';
    }
}