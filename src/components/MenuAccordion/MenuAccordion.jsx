import React from 'react';
 import ProductCardContainer from '../ProductCardContainer/ProductCardContainer';
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';
 
// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';
import './MenuAccordion.css';

export default function Example({track, menuGroup, no}) {
    return (
            <AccordionItem uuid={String(track)} className={`accordItem section${no}`}>
                <AccordionItemHeading className="accordHead">
                    <AccordionItemButton>
                        {menuGroup.name}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div>
                    <ProductCardContainer productList={menuGroup.products}/>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
    );
}