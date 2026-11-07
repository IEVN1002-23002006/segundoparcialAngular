import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path:'formularios',
    children:[
      {
        path:'usuarios',
        loadComponent:()=>
          import('./formularios/usuario/usuario').then(
            (c)=> c.Usuario
          )
      },
      {
         path:'zodiaco',
        loadComponent:()=>
          import('./formularios/zodiaco/zodiaco').then(
            (c)=> c.Zodiaco
          )
      }
    ]
  },
  {
    path:'escuela',
    children:[
      {
        path:'lista-alumnos',
        loadComponent:()=>
        import('./escuela/lista-alumnos/lista-alumnos').then(
          (c)=> c.ListaAlumnos
        )
      },
      {
        path: 'cinepolis',
        loadComponent:()=>
          import('./escuela/cinepolis/cinepolis').then(
            (c)=> c.Cinepolis
          )
      },
      {
      path: 'ver-registros',
      loadComponent:()=>
        import('./escuela/ver-registros/ver-registros').then(
          (c)=> c.VerRegistros
        )
      }
    ]
  },
  {
    path: 'utl',
    children:[
      {
        path:'ABCAlumnos',
        children:[
          {
            path: 'alumnos',
            loadComponent:()=>
            import('./utl/ABCAlumnos/alumnos/alumnos').then(
            (c)=>c.Alumnos
          )
          },
          {
            path: 'agregar',
            loadComponent:()=>
              import('./utl/ABCAlumnos/agregar/agregar').then(
                (c)=>c.Agregar
              )
          },
          {
            path: 'editar',
            loadComponent:()=>
              import('./utl/ABCAlumnos/editar/editar').then(
                (c)=>c.Editar
              )
          },
          {
            path: 'eliminar',
            loadComponent:()=>
              import('./utl/ABCAlumnos/eliminar/eliminar').then(
                (c)=>c.Eliminar
              )
          }
        ]
      },
      {
      path: 'ABCMaestros',
      children: [
        {
          path: 'maestros',
          loadComponent: () =>
            import('./utl/ABCMaestros/maestros/maestros').then(
              (c) => c.Maestros
            )
        },
        {
          path: 'agregar',
          loadComponent: () =>
            import('./utl/ABCMaestros/agregar/agregar').then(
              (c) => c.Agregar
            )
        },
        {
          path: 'editar',
          loadComponent: () =>
            import('./utl/ABCMaestros/editar/editar').then(
              (c) => c.Editar
            )
        },
        {
          path: 'eliminar',
          loadComponent: () =>
            import('./utl/ABCMaestros/eliminar/eliminar').then(
              (c) => c.Eliminar
            )
        },
      ]
    }
    ]
  },
  {
    path: '', redirectTo: 'admin', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'admin'
  }

];
