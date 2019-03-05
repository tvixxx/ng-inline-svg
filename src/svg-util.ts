import { Renderer2 } from '@angular/core';

/**
 * Checks whether a given URL is for an SVG symbol.
 *
 * @param url URL of SVG to load.
 */
export function isUrlSymbol(url: string): boolean {
  return url.charAt(0) === '#' || url.indexOf('.svg#') > -1;
}

/**
 * Checks whether SVGs are supported.
 */
export function isSvgSupported(): boolean {
  return typeof SVGRect !== 'undefined';
}

/**
 * Extracts the symbol from the given SVG into its own SVG element, using
 * a `<use>` tag.
 *
 * @param svg The SVG to get the symbol from.
 * @param symbolId The ID of the symbol.
 */
export function createSymbolSvg(renderer: Renderer2, svg: SVGElement, symbolId: string): SVGElement {
  const symbol = svg.querySelector(`[id="${symbolId}"]`);
  if (!symbol) {
    throw new Error(`Symbol "${symbolId}" not found`);
  }

  const elSvg = renderer.createElement('svg', 'svg');
  renderer.appendChild(elSvg, symbol);

  const elSvgUse = renderer.createElement('use', 'svg');
  renderer.setAttribute(elSvgUse, 'href', `#${symbolId}`, 'xlink');
  renderer.appendChild(elSvg, elSvgUse);

  return elSvg;
}

/**
 * Removes attributes from an element.
 *
 * @param element Element with attributes.
 * @param attrs Names of attributes to remove.
 */
export function removeAttributes(element: Element, attrs: Array<string>): void {
  const svgAttrs = element.attributes;
  for (let i = 0; i < svgAttrs.length; i++) {
    if (attrs.indexOf(svgAttrs[i].name.toLowerCase()) > -1) {
      element.removeAttribute(svgAttrs[i].name);
    }
  }

  // Child nodes
  const innerEls = element.getElementsByTagName('*');
  for (let i = 0; i < innerEls.length; i++) {
    removeAttributes(innerEls[i], attrs);
  }
}