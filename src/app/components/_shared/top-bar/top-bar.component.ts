import { Component, input } from '@angular/core';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

interface DropdownMenuItem {
  label: string;
  fn: () => void;
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  title = input<string>();
  dropdownMenu = input<DropdownMenuItem[]>();

  constructor(private location: Location) {}

  onClickNavigateBack() {
    this.location.back();
  }
}
