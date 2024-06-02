import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ReasonDialogComponent } from './reason-dialog/reason-dialog.component';
import { NavbarService } from '../../../components/NavBar.service';
import { DataService } from '../../static/data.service';
import { StaticService } from '../../static/static.service';
import { SelectedItemService } from '../communiation.service';
import { RejectSD } from '../../models/RejectSD';
import { ValidService } from '../validation.service';

@Component({
  selector: 'app-reject-dia',
  templateUrl: './reject-dia.component.html',
  styleUrls: ['./reject-dia.component.scss']
})
export class RejectDiaComponent implements OnInit {
  showFirstDialog: boolean = true;
  showSecondDialog: boolean = false;
  dataName: string = '';
  inputValues: string[] = [''];
  showRejectDialog: boolean = false;
  showCreateButton: boolean = true; // Contrôle la visibilité du bouton Create
  showExportButton: boolean = true; // Contrôle la visibilité du bouton Export
  items: any[] = [
    {
      id: 1,
      name: "Example 1",
      status: "Inactive/Draft",
      category: "Category 1",
      types: ["global"],
      createDate: "2022-04-20",
      createdBy: "User 1",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    {
      id: 2,
      name: "Example 2",
      status: "Inactive/Draft",
      category: "Category 2",
      types: ["global"],
      createDate: "2022-04-21",
      createdBy: "User 2",
      checked: false // Ajoutez une propriété pour la case à cocher
    },
    // Ajoutez plus d'exemples si nécessaire
  ];
  modalRef: any;
  submittedDataList: any[] = [];
    toastr: any;
  constructor(private modalService: NgbModal, private validservice: ValidService  ,private selectedItemService: SelectedItemService, private navbarService: NavbarService, private dataService: DataService, private staticservice: StaticService) { } onNext() {
    this.showFirstDialog = false;
    this.showSecondDialog = true;
  }
  @Output() statusUpdate: EventEmitter<string> = new EventEmitter<string>();
  showReasonInput: boolean = false;
  rejectReason: string = '';
  openSecondDialog() {
    // Autres logiques nécessaires
    this.statusUpdate.emit('Rejected');
  }
  status1: any;
  onYesClick(): void {
    this.showReasonInput = true;
    this.staticservice.RejectedStaticData(this.namee).subscribe(
      (response) => {
        console.log('Rejection successful:', response);
        for (let item of this.submittedDataList) {
          if (item.Name == this.namee) {
            item.Status = "Rejected";
            console.log("itzmR", item);
            this.dataService.changeItem1(item);

           
          } else {
            console.log("ereurrrr");

          }
        }
      },
      (error) => {
        console.error('Rejection failed:', error);
      }
    );
 
    const modalOptions: NgbModalOptions = {
      backdrop: false, // Désactiver le blocage de fond
      keyboard: true // Activer la fermeture avec la touche "Escape"
    };
    const modalRef = this.modalService.open(ReasonDialogComponent, modalOptions);
 
    this.notif.push(this.reason);
    console.log('demamré:', this.notif);
    modalRef.result.then((reason) => {
      console.log('Reason:', reason);
      this.reason = reason;
      const rejectSD: RejectSD = {
        Name: this.namee,
        Status: "Rejected",
        DateCreated: new Date(),
        CreatedBy: "name",
        Reason: this.reason
      }
      this.validservice.saveRejectedStaticData(rejectSD).subscribe(
        response => {
          console.log('Rejected successful:', response);
          this.toastr.success('Données enregistrées avec succès.');
        },
        error => {
          // Erreur lors de la requête
          this.toastr.error('Une erreur s\'est produite lors de l\'enregistrement des données.');
          console.error(error);
        });

    
   
      this.navbarService.changeReason(reason);
    }).catch((error) => {
      console.log('Modal closed without entering reason.');
    });
    this.showFirstDialog = false;
  }

  reason: string = '';
  closeModal() {
    // Fermer la fenêtre modale
    this.modalRef.close();
  }
  notif: string[] = [];
  saveReason() {
    
      console.log('Raisossn du rejet:', this.reason);
      
    
  

    this.modalRef.close(this.reason);
  }
  onClose() {
    this.dataName = '';
    this.showFirstDialog = false;
    this.showSecondDialog = false;
  }

  onBack() {
    this.showSecondDialog = false;
    this.showExportButton = false; 
    this.showFirstDialog = true; 
  }





  addInput(index: number) {
    this.inputValues.splice(index + 1, 0, ''); // Ajouter un champ d'entrée vide après l'index spécifié
  }

  removeInput(index: number) {
    this.inputValues.splice(index, 1); // Supprimer le champ d'entrée à l'index spécifié
  }
  exportToExcel() {
    // Simuler un clic sur l'élément input caché pour que l'utilisateur puisse choisir un emplacement de fichier
    document.getElementById('fileInput').click();
  }

  onFileChosen(event: any) {
    const selectedFile = event.target.files[0];
    // Ici, vous pouvez générer le fichier Excel et l'enregistrer à l'emplacement choisi par l'utilisateur
  }

  namee: string;
  selectedItemName: string = '';
  ngOnInit(): void {
    this.selectedItemService.selectedItem$.subscribe(name => {
      this.selectedItemName = name;
      console.log("staticdata", this.selectedItemName);// Mettre à jour le selectedItemName lorsque des mises à jour sont émises
    });
     this.namee = this.selectedItemService.getsharedata();
    console.log(this.namee);
    this.submittedDataList = this.dataService.submittedDataList;
    console.log("listtt", this.submittedDataList);
  }


  
}
