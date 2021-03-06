import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo',
  template: `
    <div class="demo-svg1" aria-label="My icon 1" [inlineSVG]="'img/image.svg'" [onSVGLoaded]="handleSVG" [removeSVGAttributes]="['xmlns']"></div>
    <div class="demo-svg2" aria-label="My icon 2" [inlineSVG]="'img/image.svg'" [replaceContents]="true" [setSVGAttributes]="_attrs">Content</div>
    <div *ngIf="_showOther" class="demo-svg3" aria-label="My delayed icon" [inlineSVG]="'img/image_with_fill.svg'" [removeSVGAttributes]="['fill']"></div>
    <div [inlineSVG]="'img/symbol.svg#fish'"></div>
    <div [inlineSVG]="'#fish'"></div>
    <div [inlineSVG]="'#fish'" [injectComponent]="true"></div>
    <div [inlineSVG]="'img/nope.svg'" [fallbackImgUrl]="'https://nodei.co/npm/ng-inline-svg.png?compact=true'"></div>
  `
})
export class DemoComponent implements OnInit {
  private _showOther: boolean = false;
  private _attrs = {
    'width': '50',
    'height': '50'
  };

  ngOnInit() {
    setTimeout(() => {
      this._showOther = true;
    }, 100);
  }

  handleSVG(svg: SVGElement, parent: Element | null): SVGElement {
    console.log('Loaded SVG: ', svg, parent);
    svg.setAttribute('width', '100');
    return svg;
  }
}
