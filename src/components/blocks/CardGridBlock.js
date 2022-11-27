import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from '../navigation/Link'

export const CardGridBlock = ({ group }) => {

    const cards = group.map( ( card, index ) => {
        const { title, image, link } = card
        const imageData = getImage(image?.localFile)
        if (!imageData) return null

        return (
            <div className={ `card ${link?.url ? '-hasLink' : ''}` } key={`${title}-${index}`}>
                <div className='card__content'>
                    { link?.url &&
                        <Link className='card__link' to={ link.url } target={ link.target }>
                            { title }
                        </Link>
                    }

                    { !link?.url &&
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
                </div>
            </div>
        )
    })

    return (
        <div className="cardGridBlock" data-grid-items={ group.length } style={{ '--grid-count': group.length }}>
            { cards }
        </div>
    )
}