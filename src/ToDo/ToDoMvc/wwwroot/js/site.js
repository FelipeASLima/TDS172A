// Write your JavaScript code.
$(document).ready(function () {
    $('#add-item-button')
        .on('click', addItem);
});

function addItem() {
    $('#add-item-error').hide();
    var newTitle = $('#add-item-title').val();
    var newDueAt = $('#add-item-due-at').val();
    $.post('/ToDo/AddItem',
        { title: newTitle, dueAt: newDueAt },
        () => window.location = '/ToDo'
    ).fail(function (data) {
        var error = data.statusText;
        if (data.responseJSON) {
            var key = Object.keys(data.responseJSON)[0];
            error = data.responseJSON[key];
        }
        $('#add-item-title').text(error);
        $('#add-item-due-at').show();
    });
}