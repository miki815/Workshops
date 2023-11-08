import { Time } from "@angular/common";
import { Cet } from "./cet";
import { Komentar } from "./komentar";

export class Radionica{
    _id: string;
    naziv: string;
    datum: Date;
    mesto: string;
    opis_kratak: string;
    opis_duzi: string;
    glavna_slika: string;
    galerija_slike: Array<string>;
    organizator: string;
    status: string;
    slobodnih_mesta: number;
    ucesnici: Array<string>;
    svidjanja: Array<string>;
    komentari: Array<Komentar>;
    zahtevi: Array<string>;
    caskanje: Array<Cet>;
}