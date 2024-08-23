import { Component, inject, model, signal } from '@angular/core';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TopBarComponent } from '../../_shared/top-bar/top-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { EditFieldModalComponent } from './edit-field-modal/edit-field-modal.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatIconModule, MatCardModule, TopBarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  username = signal('');
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private location: Location) {}

  onClickNavigateBack() {
    this.location.back();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditFieldModalComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
