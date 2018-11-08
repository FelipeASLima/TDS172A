// Write your JavaScript code.
$(document).ready(function () {
    $('#add-item-button').on('click', addItem());
    $('.done').on('click', markDone);
    $('.edit').on('click', editItem);
    $('.delete').on('click', deleteItem);

    var postError = (function () {
        var $itemError = $('#add-item-error');
        function erroOnPost(data) {
            var error = data.statusText;
            if (data.responseJSON) {
                var key = Object.keys(data.responseJSON)[0];
                error = data.responseJSON[key];
            }
            $itemError.text(error).show;
        }
        return {
            hide: () => $itemError.hide(),
            onError: erroOnPost
        };

    })();
    function addItem() {
        var newTitle = $('#add-item-title');
        var newDueAt = $('#add-item-due-at');
        return function () {
            postError.hide();
            $.post(
                '/ToDo/AddItem',
                { title: newTitle.val(), dueAt: newDueAt.val() },
                () => window.location = '/ToDo'
            ).fail(postError.onError);
        };
    }

    function markDone(ev) {
        ev.target.disabled = true;
        postError.hide();
        $.post('/ToDo/MarkDone',
            { id: ev.target.name },
            function () {
                var row = ev.target
                    .parentElement.parentElement;
                row.classList.add('done');
            }
        ).fail(postError.onError);
    }

    function editItem(ev) {
        ev.target.disabled = true;
        postError.hide();

        $title = $("#edit-item-title");
        $dueAt = $("#edit-item-due-at");
        $id = $("#edit-item-id");
        $modal = $("#edit-item-modal");

        $("#edit-item-modal").modal('show');
        //console.log("id sendo enviado: " + ev.target.name);
        $.post('/ToDo/GetItem', {
            id: ev.target.name
        },
            function (item) {
                $title.val(item.title);
                //console.log("Titulo: " + item.title);
                $due = item.dueAt.split('T', 1);
                $dueAt.val($due);

                //console.log("Data: " + item.dueAt);
                $id.val(item.id);
                //console.log("ID: " + item.id);
                $modal.modal('show');

                $(".closemodal").on('click', function () {
                    ev.target.disabled = false;
                });

                $("#save").on('click', function () {
                    console.log("clicou em salvar");
                    console.log("data: " + $due[0]);
                    $.post(
                        '/ToDo/SaveEdit',
                        {
                            id: $id.val(),
                            title: $title.val(),
                            dueAt: $dueAt.val()
                        }
                    )
                    .success(function () {
                        $modal.modal('hide');
                        ev.target.disabled = false;
                        window.location = '/ToDo';
                    })
                    .fail(postError.onError);
                });


            }
        ).fail(postError.onError);
    }

    function deleteItem() {

    }

});