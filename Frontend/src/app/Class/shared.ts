import { ToastService } from 'src/app/Services/toast.service';
import { AuthService } from 'src/app/Services/auth.service';

export class Shared {

  	constructor(
		private toastService: ToastService,
		protected authService: AuthService
	) {}

	showMsgSuccess(texto:string) {
		this.toastService.show(texto, {
			classname: "bg-success text-light",
			delay: 5000
		});
	}

	showMsgDanger(errors:any) {
		for (let i=0; i < errors.length; i++) {
			this.toastService.show(errors[i], {
				classname: "bg-danger text-light",
				delay: 5000
			});
		}
	}

}
