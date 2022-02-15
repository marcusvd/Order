import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})



export class AlertsToastr {


  private ActionsMessages: string[] = ['Cadastrado.', 'Atualizado.', 'Excluido.', 'Seja, bem vindo!']
  private Erro: string = 'Estamos com algum problema.';
  public ErrorAuthenticationFail = 'Falha de login, usuário não autenticado!';
  constructor(private _Toast: ToastrService) { }

  public Notice(personalMessage?: string, actMsg?: number, actMsgType?: string, LayerErrorApp?: string) {
    if (actMsgType == 'success') {
      this._Toast.success(personalMessage + ' ' + this.ActionsMessages[actMsg] + ' Sucesso!!!')
    }
    if (actMsgType == 'error') {
      this._Toast.error(this.Erro + ' ' + LayerErrorApp + ', ' + 'Por favor, entre em contato com o suporte técnico.' + ' ' + personalMessage)
    }


  }



}
