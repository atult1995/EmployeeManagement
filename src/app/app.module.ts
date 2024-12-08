import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/module/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [UserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
