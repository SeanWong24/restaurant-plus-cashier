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
            case 'Togo':
                return 'medium'
        }
    }
}

@Pipe({ name: 'tableOperationButtonText' })
export class TableOperationButtonTextPipe implements PipeTransform {
    transform(status: string, index: number): string {
        switch (status) {
            case 'Free':
                switch (index) {
                    case 0:
                        return 'Disable';
                    case 1:
                        return 'Reserve';
                    case 2:
                        return 'Open';
                    default:
                        return '';
                }
            case 'Using':
                switch (index) {
                    case 0:
                        return 'Confirm';
                    case 1:
                        return 'Transfer';
                    case 2:
                        return 'Close';
                    default:
                        return '';
                }
            case 'Reserved':
                switch (index) {
                    case 0:
                        return 'Confirm';
                    case 1:
                        return 'Free';
                    case 2:
                        return 'Open';
                    default:
                        return '';
                }
            case 'Dirty':
                switch (index) {
                    case 0:
                        return 'Disable';
                    case 1:
                        return 'Free';
                    default:
                        return '';
                }
            case 'Unavailable':
                switch (index) {
                    case 1:
                        return 'Free';
                    default:
                        return '';
                }
        }
    }
}
