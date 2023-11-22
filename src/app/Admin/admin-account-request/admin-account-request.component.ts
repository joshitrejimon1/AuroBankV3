import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AccountServiceService } from "src/app/service/account-service.service";
import { DocumentServiceService } from "src/app/service/document-service.service";
@Component({
  selector: "app-admin-account-request",
  templateUrl: "./admin-account-request.component.html",
  styleUrls: ["./admin-account-request.component.css"],
})
export class AdminAccountRequestComponent {
  refreshfun() {
    console.log("refresh");
    location.reload();
  }
  accounts: any[] = [];
  approvalaccount: any[] = [];

  constructor(private auth: AccountServiceService,private doc: DocumentServiceService) {
    this.auth.ShowAccountRequest().subscribe({
      next: (data: any) => {
        this.accounts = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching accounts:", error);
      },
    });
  }

  acceptAccount(account: any) {
    // Update the account's isActive in the frontend
    account.isActive = true;

    // Assuming you have a method in your ApiService to activate the account
    this.auth.AcceptAccountRequest(account.accountNumber).subscribe(
      () => {
        // Handle success if needed
      },
      (error: HttpErrorResponse) => {
        console.error("Error activating account:", error);
        // Handle error, show user-friendly message, etc.
      }
    );
  }

  viewDocument(account: any) {}
  // Assuming you have a method in your ApiService to fetch data
  searchForm: FormGroup = new FormGroup({
    documentId: new FormControl(""),
  });
  documents: any;
  imageSource: any;
  onSubmit(data: any) {
    console.log("docId", data);

    this.doc.GetuploadDocument(data.documentId).subscribe({
      next: (response: any) => {
        console.log("API Response:", response);
        this.imageSource = "data:image/jpeg;base64," + response.documentData;
        if (response && response.data) {
          // Assuming 'response.data' is the base64-encoded image string
          this.imageSource = "data:image/jpeg;base64," + response.data;
        } else {
          console.error("Invalid response from the server");
        }
      },
      error: (error: any) => {
        console.error("Error fetching image", error);
      },
    });
  }

  searchCustomerId: any;
}
