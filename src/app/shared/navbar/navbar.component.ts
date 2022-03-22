import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedLanguageText = 'English';
  selectedLanguageFlag = './assets/img/flags/us.png';
  logoUrl = './favicon.ico';
  menuPosition = 'Side';
  isSmallScreen = false;
  protected innerWidth: any;
  transparentBGClass = '';
  hideSidebar = true;
  layoutSub: Subscription;
  configSub: Subscription;
  userName: string = 'Admin';

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();
  control = new FormControl();

  public config: any = {};

  constructor(public translate: TranslateService,
    private layoutService: LayoutService,
    private router: Router,
    private configService: ConfigService, private cdr: ChangeDetectorRef,
    private authService: AuthService) {

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe(
      isShow => {
        this.hideSidebar = !isShow;
      });
  }

  ngOnInit() {
    this.isSmallScreen = this.innerWidth < 1200;
    const userData: any = JSON.parse(localStorage.getItem('user')) ;
    if(userData){
      this.userName = userData.first_name+' '+userData.last_name;
    }
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();
    })
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.isSmallScreen = this.innerWidth < 1200;
  }

  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() !== '') {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === 'Light') {
      this.logoUrl = './favicon.ico';
    } else {
      this.logoUrl = './favicon.ico';
    }

    if (this.config.layout.variant === 'Transparent') {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    } else {
      this.transparentBGClass = '';
    }

  }

  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }

  logoutUser(){
      this.authService.logout();
  }
}
