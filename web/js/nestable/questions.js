$(document).ready(function()
{

    // activate Nestable for list 1
    $('#questions-enfants').nestable({
        group: 1
    });

    var $expand = false;
    $('#nestable-menu').on('click', function(e)
    {
        if ($expand) {
            $expand = false;
            $('.dd').nestable('expandAll');
        }else {
            $expand = true;
            $('.dd').nestable('collapseAll');
        }
    });

});