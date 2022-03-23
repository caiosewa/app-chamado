import { animate, animateChild, group, query, sequence, state, style, transition, trigger, useAnimation } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition('login => register, register => new-ticket, new-ticket => list-ticket, list-ticket => my-profile, my-profile => new-ticket', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-out', style({ right: '100%', opacity: 0 }))]),
      query(':enter', [animate('1s ease-out', style({ right: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]),

  transition('register => login, new-ticket => register, list-ticket => new-ticket, my-profile => list-ticket, new-ticket => my-profile', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-out', style({ left: '100%', opacity: 0 }))]),
      query(':enter', [animate('1s ease-out', style({ left: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]),

  transition('login => forgotpass, forgotpass => login', [
    style({
      position: 'relative'
    }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({
      opacity: 0,
      transform: 'perspective(500px) translateZ(-500px)',
    })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('1s ease-in', style({ opacity: 0, transform: 'perspective(500px) translateZ(-500px)'}))]),
      query(':enter', [animate('1s ease', style({ opacity:1, transform: 'perspective(500px) translateZ(0px)'}))])
    ]),
    query(':enter', animateChild())
  ])
]);
