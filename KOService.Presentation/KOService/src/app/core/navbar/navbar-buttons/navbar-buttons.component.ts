import { Component, OnInit, Input } from '@angular/core';
import { NavbarButton } from '../models/NavbarButton';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar-buttons',
    templateUrl: './navbar-buttons.component.html',
    styleUrls: ['./navbar-buttons.component.css', '../navbar.component.css']
})
export class NavbarButtonsComponent implements OnInit {

    @Input() buttons: NavbarButton[];

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigate(link: string) {
        this.router.navigate([link]);
    }

    getRightButtons(): NavbarButton[] {
        return this.buttons.filter(b => b.alignedToRight === true);
    }

    getLeftButtons(): NavbarButton[] {
        return this.buttons.filter(b => b.alignedToRight === false);
    }

    leftButtonsPresent(): boolean {
        if (this.buttons) {
            return this.buttons.find(b => b.alignedToRight === false) ? true : false;
        } else {
            return false;
        }
    }

    rightButtonsPresent(): boolean {
        if (this.buttons) {
            return this.buttons.find(b => b.alignedToRight === true) ? true : false;
        } else {
            return false;
        }
    }
}
