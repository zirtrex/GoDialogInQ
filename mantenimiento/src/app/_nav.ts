import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Tipos de Préstamo',
    url: '/dashboard/tipo_prestamo',
    icon: 'icon-speedometer',
  },
  {
    name: 'Requisitos',
    url: '/dashboard/requisito',
    icon: 'icon-ban',
  },
  {
    name: 'Clientes',
    url: '/dashboard/cliente',
    icon: 'icon-ban',
  },
  {
    name: 'Préstamo Cliente',
    url: '/dashboard/prestamo_cliente',
    icon: 'icon-ban',
  },
  {
    name: 'GitHub Project',
    url: 'https://github.com/zirtrex/GoDialogInQ',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Fronted Chat',
    url: 'localhost:8082',
    icon: 'icon-layers',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];
