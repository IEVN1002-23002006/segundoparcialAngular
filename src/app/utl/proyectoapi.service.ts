import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlumnosUtl } from "./alumnos-utl";
import { MaestrosUtl } from "./maestros-utl";

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {
  private urlAlumnos = 'http://127.0.0.1:5000/alumnos';
  private urlMaestros = 'http://127.0.0.1:5000/maestros';

  constructor(private http: HttpClient) { }

  // ================= ALUMNOS =================
  public getAlumnos(): Observable<any> {
    return this.http.get<any>(this.urlAlumnos);
  }

  agregarNuevoAlumno(datos: AlumnosUtl) {
    return this.http.post(this.urlAlumnos, datos);
  }

  public getAlumno(mat: string): Observable<any> {
    return this.http.get<any>(`${this.urlAlumnos}/${mat}`);
  }

  modificarAlumno(mat: number, datos: AlumnosUtl) {
    return this.http.put(`${this.urlAlumnos}/${mat}`, datos);
  }

  public EliminaAlumno(mat: number): Observable<AlumnosUtl> {
    return this.http.delete<AlumnosUtl>(`${this.urlAlumnos}/${mat}`);
  }

  // ================= MAESTROS =================
  public getMaestros(): Observable<any> {
    return this.http.get<any>(this.urlMaestros);
  }

  agregarNuevoMaestro(datos: MaestrosUtl): Observable<any> {
    return this.http.post<any>(this.urlMaestros, datos);
  }

  public getMaestro(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.urlMaestros}/${id}`);
  }

  modificarMaestro(id: number, datos: MaestrosUtl): Observable<any> {
    return this.http.put<any>(`${this.urlMaestros}/${id}`, datos);
  }

  public eliminaMaestro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlMaestros}/${id}`);
  }
}
