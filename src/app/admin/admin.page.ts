import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  pages: object[] = [
    {
      title: 'Users Management',
      url: 'admin/users-management'
    },
    {
      title: 'Products Management',
      url: 'admin/products-management'
    },
    {
      title: 'Orders Management',
      url: 'admin/orders-management'
    }
  ];

  selectedPath = '';

  constructor(
    private router: Router
  ) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

}
