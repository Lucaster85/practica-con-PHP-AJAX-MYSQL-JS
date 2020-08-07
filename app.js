$(document).ready(function () {

    let edit = false;

    $('#task-result').hide();
    getTasks();

    /* BUSCAR */
    $('#search').keyup(function () {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    console.log(response);
                    let tasks = JSON.parse(response);
                    console.log(tasks);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                    ${task.name}
                    </li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });
    /* GUARDAR */
    $('#task-form').submit((e) => {
        let postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val()
        }
        let url = edit === false ? 'task-add.php' : 'task-edit.php';

        $.post(url, postData, function (response) {
           // console.log(response);
            getTasks();
            $('#task-form').trigger('reset');
        })
        e.preventDefault();
    });
    /* Actualizar tabla */
    function getTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response)
                console.log(tasks);
                let template = '';
                tasks.forEach(task => {
                    template += `
                    <tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td><a href="#" class="js-task-item">${task.name}</a></td>
                        <td>${task.description}</td>
                        <td><button class="btn btn-danger btn-sm js-task-delete">Delete</button>
                    </tr>`;

                    $('#tasks').html(template);
                });
            }
        });
    }
    /* BORRAR */
    $(document).on('click', '.js-task-delete', function () {
        if (confirm('Are you sure you want to delete this task???')) {
            console.log('clickeado');
            let element = $(this)[0].parentElement.parentElement; //requiero del btn al padre de su padre <tr> ahi encuentro el "id" 
            let id = $(element).attr('taskId'); //asigno el atributo a la fila que contiene el dato
            $.post("task-delete.php", { id }, function (response) {
                getTasks();
                console.log(response);
            });
        }
    });
    /* EDITAR */
    $(document).on('click', '.js-task-item', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post("task-single.php", {id}, function (response) {
        console.log(response);
        let task = JSON.parse(response);
        $('#name').val(task.name);
        $('#description').val(task.description);
        $('#taskId').val(task.id);
        edit = true;
        console.log(task.id + 'aca aca');
        });
    });
});