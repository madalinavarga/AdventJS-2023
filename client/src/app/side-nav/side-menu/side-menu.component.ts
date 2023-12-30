import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  isOpen: boolean = false;
  menuIcon = faBars;
  closeIcon = faClose;
  constructor(private router: Router) {

  }

  handleSideMenu() {
    this.isOpen = !this.isOpen
  }

  logout() {
    localStorage.removeItem("token=");
    this.router.navigate(['/auth/login']);
  }

}
