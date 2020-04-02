import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tableStatusColor' })
export class TableStatusColorPipe implements PipeTransform {
    transform(status: string): string {
        switch (status) {
            case 'Free':
                return 'secondary';
            case 'Using':
                return 'success';
            case 'Reserved':
                return 'tertiary';
            case 'Dirty':
                return 'warning';
            case 'Unavailable':
                return 'danger';
        }
    }
}
