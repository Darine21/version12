import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogsComponent } from '../dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { CollapseModule } from 'ng-uikit-pro-standard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { Router } from '@angular/router';
//import { ShareDiaComponent } from '../share-dia/share-dia.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  data: any[] = [];
  filteredData: any[];
  isNavbarCollapsed = true;
  selectedNavItem: string | null = null;
  activeLineIndex: number = 0;
  selectedDate: string = '';
  creationDate: NgbDateStruct;
  showForm: boolean = true; // Pour afficher soit le formulaire, soit la table
  inputValues: string[] = []; // Tableau pour stocker les valeurs saisies
  isValuesSelected: boolean = false;
  showOptions: boolean[] = [];
  entitiesToShareWith: string[] = ['Entity 1', 'Entity 2', 'Entity 3'];
  //@ViewChild(ShareDiaComponent) multiselectComponent: ShareDiaComponent;
  // Définissez la liste des valeurs prédéfinies
  predefinedValues: string[] = ['Val1', 'Val2', 'Val3'];
  selectedValue: string = '';
  newValue: string = '';
    options: any;

  constructor(private dialog: MatDialog, private router: Router) { }
  checkAndAddValue() {
    // Vérifiez si la valeur saisie correspond à l'une des valeurs prédéfinies
    if (this.predefinedValues.includes(this.newValue)) {
      // Ajoutez la valeur saisie à la liste inputValues
      this.inputValues.push(this.newValue);
      // Réinitialisez la valeur saisie à une chaîne vide
      this.newValue = '';
    }
  }
  // Déclarez la variable newValue dans la classe de composant


  // Définissez la méthode addNewValue pour ajouter une nouvelle valeur
  addNewValue(value: string) {
    if (value.trim() !== '') {
      this.options.push(value);
      // Réinitialisez la valeur du champ de saisie
      this.newValue = '';
    }
  }
  naviguerVersValide() {
    this.router.navigate(['/valide']);
  }
  sharedEntities: string[] = [];
  addSelectedValue() {
    // Vérifiez si une valeur est sélectionnée
    if (this.selectedValue) {
      // Ajoutez la valeur sélectionnée à la liste inputValues
      this.inputValues.push(this.selectedValue);
      // Réinitialisez la valeur sélectionnée à une chaîne vide
      this.selectedValue = '';
    }
  }


  showShareOptions: boolean = false
  ngOnInit(): void {
    this.inputValues.push(''); // Ajoute une valeur initiale vide
    this.showOptions.push(false); // Initialise showOptions pour la première valeur
  }
 // Initialisation

  
  shareOptions() {
    this.showShareOptions = !this.showShareOptions; // Bascule la valeur de showShareOptions
  }
 
  // Dans votre composant TypeScript
  toggleOptions(index: number): void {
    this.showOptions[index] = !this.showOptions[index];
  }

  // Tableau pour stocker les valeurs saisies

  // Méthode pour ajouter une nouvelle valeur
 
  addInput(index: number) {
    this.inputValues.splice(index + 1, 0, '');
    this.showOptions.splice(index + 1, 0, false); // Ajouter un champ d'entrée vide après l'index spécifié
  }

  // Méthode pour supprimer une valeur à l'index spécifié
  removeInput(index: number) {
    this.inputValues.splice(index, 1); // Supprimer le champ d'entrée à l'index spécifié
  }

  // Méthode pour partager la valeur à l'index spécifié
  
  

  isItemSelected(item: string): boolean {
    // Retourne true si l'élément spécifié est sélectionné, sinon false
    return item === 'Values' && this.isValuesSelected;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  toggleLine(itemId: string) {
    // Masquez toutes les lignes d'abord
    document.querySelectorAll('.line').forEach((line: HTMLElement) => {
      line.style.display = 'none';
    });
  }
    
    
  selectDetails() {
    this.showForm = true; // Afficher le formulaire lorsque vous cliquez sur "Details"
  }

  selectValues() {
    this.showForm = false; // Afficher la table lorsque vous cliquez sur "Values"
  }
  submit() {
    // Logique pour gérer la soumission des données
    console.log('Submitting data...');
  }

  moveLine(index: number) {
    this.activeLineIndex = index;
  }

    // Méthode pour ajouter une nouvelle valeur
    
  }
    // Affichez la ligne sous l'élément sur lequel vous avez cliqué
