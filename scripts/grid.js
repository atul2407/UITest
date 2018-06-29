
var Apple = Apple || {};
var gridData = EmployeeData.employees;
Apple.Grid = (function () {

    var LoadGrid = function () {

        var tBody = $('#jqGrid > tbody');
        tBody.html('');
        var trs = '';
        $(gridData).each(function (index, value) {
            trs = trs + '<tr>' +
                        '<td id="tdName" style="width:200px;">' + value.name + '</td>' +
                        '<td id="tdEmail" style="width:250px;">' + value.email + '</td>' +
                        '<td id="tdTitle" style="width:250px;">' + value.Title + '</td>' +
                        '<td id="tdDept" style="width:200px;">' + value.Dept + '</td>' +
                        '<td id="tdLocation" style="width:200px;">' + value.Location + '</td>' +
                        '<td  style="width:50px;"><img src="content/images/pencil.svg" style="width:20px;height:20px;cursor: pointer;" onclick="Apple.Grid.editRow(this);"/></td>' +
                        '<td style="width:50px;"><img src="content/images/trash.svg" style="width:20px;height:20px;cursor: pointer;" onclick="Apple.Grid.deleteRow(this);"/></td>' +
                        '</tr>';
        });

        tBody.append(trs);
    };

    var isAddMode = false;
    var AddRow = function (row) {
        var modalWin = $('#editModal');
        modalWin.modal();
        modalWin.find('input').val('');
        modalWin.find('input').removeAttr('readonly');
        isAddMode = true;
    };

    var EditRow = function (row) {
        var tr = $(row).parent().parent();
        $('#editModal').modal();
        var name = $('#txtName');
        var email = $('#txtEmail');
        name.attr('readonly', 'true');
        email.attr('readonly', 'true');

        name.val(tr.find('#tdName').html());
        email.val(tr.find('#tdEmail').html());
        $('#txtTitle').val(tr.find('#tdTitle').html());
        $('#txtDepartment').val(tr.find('#tdDept').html().replace('amp;', ''));
        $('#txtLocation').val(tr.find('#tdLocation').html());
        isAddMode = false;
    };

    var DeleteRow = function (row) {
        var tr = $(row).parent().parent();
        var name = tr.find('#tdName').html();
        if (confirm('Are you sure wants to delete this employee record ?'))
        {
            //Note: This code is updating only to local JSON object. 
            //In realtime scenario i.e. integration with RESTful service, data is posted via AJAX call.

            gridData = gridData.filter(function (item) { return item.name != name });
            Apple.Grid.loadGrid();
            Apple.Grid.cancelEdit();
        }
    };

    var SubmitRequest = function (requestType) {

        //Note: This code is updating only to local JSON object. 
        //In realtime scenario i.e. integration with RESTful service, data is posted via AJAX call.

        var name = $('#txtName').val();
        var email = $('#txtEmail').val();
        var title = $('#txtTitle').val();
        var dept = $('#txtDepartment').val();
        var location = $('#txtLocation').val();
        if (isAddMode == true) {
            gridData.push({
                name: name,
                email: email,
                Title: title,
                Dept: dept,
                Location: location
            });
        }
        else {
            var employee = gridData.find(function (item) { return item.name == name });
            if (employee != undefined && employee != null)
            {
                employee.Title = title;
                employee.Dept = dept;
                employee.Location = location;
            }
        }
        Apple.Grid.loadGrid();
        Apple.Grid.cancelEdit();
    };

    var CancelEdit = function ()
    {
        $('a[rel="modal:close"]').trigger('click');
    }

    return {
        loadGrid: LoadGrid,
        editRow: EditRow,
        deleteRow: DeleteRow,
        addRow: AddRow,
        submitRequest: SubmitRequest,
        cancelEdit: CancelEdit
    };

})();


$(document).ready(function () {
    Apple.Grid.loadGrid();
});

