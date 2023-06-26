export class AlertController{
    constructor(){
        this.showAlert.bind(this);

    }
    showAlert(status,message){
        if(status ===  "error"){
            swal("OOPS!", message, "error");

        }else{
            swal("Done!", message, "success");
        }

    }

}
new AlertController();