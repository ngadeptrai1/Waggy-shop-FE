
import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../type';
import { AuthService } from '../../services/auth.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,RouterLink,LoadingComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent  implements OnInit {
orderService = inject(OrderService);
authService = inject(AuthService);
isLoading= true;
dataSource!: MatTableDataSource<Order>;
// displayedColumns: string[] = ['name', 'date', 'money', 'status','total'];
displayedColumns: string[] = ['full_name', 'discount_money', 'status', 'totalquantity'];

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngOnInit(): void {
  const userId = this.authService.getUserId();
    this.orderService.getOrdersByUserId(userId).subscribe(
      (orders:Order[])=>{
       this.dataSource = new MatTableDataSource<Order>(orders);
       this.isLoading = false;
       if(!this.isLoading){
        setTimeout(()=>{this.dataSource.paginator = this.paginator;},1000)
       }
      }
    );
}

}
