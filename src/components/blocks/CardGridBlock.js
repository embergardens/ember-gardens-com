import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from '../navigation/Link'

import { IconArrowSimple } from '../icons/IconArrowSimple'
import { IconExternalLink } from '../icons/IconExternalLink'

export const CardGridBlock = ({ group }) => {
    const addColumnClasses = ( length ) => {
        let classes = []
        if ( length % 4 == 0 ) {
            classes = [...classes, '-canQuarter']
        }
        if ( length % 3 == 0 ) {
            classes = [...classes, '-canThird']
        }
        if ( length % 2 == 0 ) {
            classes = [...classes, '-canHalf']
        }

        if ( length > 12 ) {
            classes = [...classes, '-isLargerGroup']
        }
        return classes
    }

    const cards = group.map( ( card, index ) => {
        const { title, image, link } = card
        const imageData = getImage(image?.localFile)
        if (!imageData) return null
        const isInternal = (url) => /^\/(?!\/)/.test(url)

        let hasLink = link?.url ?? null
        if ( hasLink ) {
            hasLink = !isInternal( link.url ) ? 'external' : 'internal'
        }

        return (
            <div className={ `card ${hasLink ? '-hasLink' : ''}` } key={`${title}-${index}`}>
                <div className='card__content'>
                    { hasLink &&
                        <Link className='card__link' to={ link.url } target={ link.target }>
                            { title }
                        </Link>
                    }

                    { !hasLink &&
                        <span className='card__span'>
                            { title }
                        </span>
                    }
                </div>
                <div className='card__media'>
                    <div className='card__mediaWrapper'>
                        <GatsbyImage
                            alt={ image.altText }
                            image={ imageData }
                            className='card__image'
                            placeholder="blurred"
                        />
                    </div>
                    { hasLink === 'external' &&
                        <div className='card__mediaOverlay'>
                            <div className='card__icon'>
                                <IconExternalLink />
                            </div>
                        </div>
                    }

                    { hasLink === 'internal' &&
                        <div className='card__mediaOverlay'>
                            <div className='card__icon'>
                                <IconArrowSimple />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }).filter(x => x) // Filter out any cards that returned null due to missing fields.

    return (
        <div className={ `cardGridBlock ${addColumnClasses(cards.length).join(' ')}`} data-grid-items={ cards.length } style={{ '--grid-count': cards.length }}>
            { cards }
        </div>
    )
}