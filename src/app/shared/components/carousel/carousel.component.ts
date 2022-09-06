import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from '@angular/animations';
import { CarouselItemDirective } from './carousel-item.directive';
import { faCaretLeft, faCaretRight, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElementDirective {
}

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styles: [`
    .material-icons { font-size: 40px !important; }
    .scroll-fade { position: relative }
    .scroll-fade:before {
      content  : "";
      position : absolute;
      z-index  : 10;
      top   : 0;
      left     : 0;
      pointer-events   : none;
      background-image : linear-gradient(to top, rgba(255,255,255, 0), #f2f2ff 90%);
      width    : 100%;
      height   : 4em;
    }
    .scroll-fade:after {
      content  : "";
      position : absolute;
      z-index  : 10;
      bottom   : 0;
      left     : 0;
      pointer-events   : none;
      background-image : linear-gradient(to bottom, rgba(255,255,255, 0), #f2f2ff 90%);
      width    : 100%;
      height   : 4em;
    }
  `]
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() vertical: boolean = false;
  @Input() scroll: boolean = false;
  @ContentChildren(CarouselItemDirective) items!: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElementDirective, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  public currentSlide = 0;

  public carouselWrapperStyle = {};
  private carouselDimension?: number;
  private player!: AnimationPlayer;
  @ViewChild('carousel') private carousel!: ElementRef;

  @Output() onChangedIndex: EventEmitter<any> = new EventEmitter<any>();

  // Icons
  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;

  constructor(private _AnimationBuilder: AnimationBuilder) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.carouselDimension = this.vertical ? this.itemsElements.first.nativeElement.getBoundingClientRect().height : this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = this.vertical ? { height: `${this.carouselDimension}px` } : { width: `${this.carouselDimension}px` }
    }, 100);
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.items.length - 1 : previous;
    const offset = (this.currentSlide * this.carouselDimension);
    const factory = this._AnimationBuilder.build(this.slide(offset));
    this.player = factory.create(this.carousel.nativeElement);
    this.player.play();
    this.onChangedIndex.emit(this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.items.length ? 0 : next;
    const offset = (this.currentSlide * this.carouselDimension);
    const factory = this._AnimationBuilder.build(this.slide(offset));
    this.player = factory.create(this.carousel.nativeElement);
    this.player.play();
    this.onChangedIndex.emit(this.currentSlide);
  }

  private slide(offset: any): AnimationMetadata[] {
    return [
      animate(this.scroll ? '200ms ease-in-out' : '300ms ease-in' , style({ transform: this.vertical ? `translateY(-${offset}px)` : `translateX(-${offset}px)` })),
    ];
  }

  private isPlayingAnimation = false;
  @HostListener('wheel', ['$event'])
  onElementScroll(e: any) {
    if (e.deltaY > 10 || e.deltaY < -10) {
      if (this.isPlayingAnimation) return
      this.isPlayingAnimation = true;

      setTimeout(() => {
        // upscroll / downscroll
        if (e.deltaY < -10) { this.onPreviousClick() }
        else { this.onNextClick() }
        this.isPlayingAnimation = false;
      }, 300);
    }
  }

}
