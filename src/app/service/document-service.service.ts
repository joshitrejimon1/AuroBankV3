import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class DocumentServiceService {
  documentUploadUrl = "https://localhost:7078/api/Document/upload";
  showDocumentUrl = "https://localhost:7078/api/Document/";
  showDocumnebtIdUrl="https://localhost:7078/api/Document/customerDocuments";
  constructor(private http: HttpClient) {}

  public uploadDocument(data: any) {
    return this.http.post(this.documentUploadUrl, data);
  }
  public GetuploadDocument(id: any) {
    return this.http.get(this.showDocumnebtIdUrl + "/" + id);
  }
}
