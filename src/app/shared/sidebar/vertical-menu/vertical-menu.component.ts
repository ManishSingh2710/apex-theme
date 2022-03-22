import {
  Component, OnInit, ViewChild, OnDestroy,
  ElementRef, AfterViewInit, ChangeDetectorRef, HostListener
} from '@angular/core';
import { ROUTES } from './vertical-menu-routes.config';
import { Router } from '@angular/router';
import { customAnimations } from '../../animations/custom-animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './vertical-menu.component.html',
  animations: customAnimations
})
export class VerticalMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon') toggleIcon: ElementRef;
  public menuItems: any[];
  level = 0;
  logoUrl = './favicon.ico';
  public config: any = {};
  protected innerWidth: any;
  layoutSub: Subscription;
  configSub: Subscription;
  perfectScrollbarEnable = true;
  collapseSidebar = false;
  resizeTimeout;

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.isTouchDevice();
  }

  ngOnInit() {
    this.menuItems = ROUTES;
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();
    });
    this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(
      (collapse:boolean) => {
        if (this.config.layout.menuPosition === 'Side') {
          this.collapseSidebar = collapse;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
      if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout((() => {
        this.innerWidth = event.target.innerWidth;
          this.loadLayout();
      }).bind(this), 500);
  }

  loadLayout() {

    if (this.config.layout.menuPosition === 'Top') { // Horizontal Menu
      if (this.innerWidth < 1200) { // Screen size < 1200
        this.menuItems = ROUTES;
      }
    } else if (this.config.layout.menuPosition === 'Side') { // Vertical Menu{
      this.menuItems = ROUTES;
    }

    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = './favicon.ico';
    } else {
      this.logoUrl = './favicon.ico';
    }
    this.collapseSidebar = !!this.config.layout.sidebar.collapsed;
  }

  toggleSidebar() {
    const conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });

    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
  };

  CloseSidebar() {
    this.layoutService.toggleSidebarSmallScreen(false);
  }

  isTouchDevice() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    this.perfectScrollbarEnable = !(isMobile || isTablet);
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }
}
