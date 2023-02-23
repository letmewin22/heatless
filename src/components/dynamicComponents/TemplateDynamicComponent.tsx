/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import DynamicComponent from './DynamicComponent'
import { HeroV1 } from '../Hero/HeroV1'
import { ItemsBlock } from '../ItemsBlock'
import { CarouselSection } from '../CarouselSection'
import { StatisticsV1 } from '../Statistics/StatisticsV1'
import { QuoteV1 } from '../Quotes/QuoteV1'
import { InfoBlockV2 } from '../InfoBlock/InfoBlockV2'
import { Logos } from '../Logos'
import { HeroV2 } from '../Hero/HeroV2'
import { InfoBlockV1 } from '../InfoBlock/InfoBlockV1'
import { HowTo } from '../HowTo'
import { CTAV1 } from '../CTA/CTAV1'
import { FAQ } from '../FAQ'
import { InfoBlockV3 } from '../InfoBlock/InfoBlockV3'
import { EmpoyeeItems } from '../EmpoyeeItems'
import { Vacatures } from '../Vacatures'
import { FormScreen } from '../Form/FormScreen'
import { VisitCard } from '../VisitCard'
import { CaseItems } from '../CaseItems'
import { InfoBlockV4 } from '../InfoBlock/InfoBlockV4'
import { StatisticsV2 } from '../Statistics/StatisticsV2'
import { PostItems } from '../Blog/PostItems'
import { PostContent } from '../Blog/PostContent'
import { InTextImage } from '../Blog/InTextImage'
import { QuoteV2 } from '../Quotes/QuoteV2'
import { Table } from '../Blog/Table'
import { TableOfContents } from '../Blog/TableOfContents'
import { SimilarPosts } from '../Blog/SimilarPosts'
import { ShareLinks } from '../Blog/ShareLinks'
import { Imagery } from '../Imagery'
import { CTAV2 } from '../CTA/CTAV2'
import { TLocation } from '../../types/types'
import { ListWithIcons } from '../Blog/ListWithIcons'

const Components = {
  'Hero V1': HeroV1,
  'Hero V2': HeroV2,
  Logos,
  'Items Block': ItemsBlock,
  Carousel: CarouselSection,
  'Statistics V1': StatisticsV1,
  'Statistics V2': StatisticsV2,
  'Quote V1': QuoteV1,
  'Quote V2': QuoteV2,
  'Info Block V1': InfoBlockV1,
  'Info Block V2': InfoBlockV2,
  'Info Block V3': InfoBlockV3,
  'Info Block V4': InfoBlockV4,
  'How To': HowTo,
  FAQ,
  'CTA V1': CTAV1,
  'CTA V2': CTAV2,
  'Empoyee Items': EmpoyeeItems,
  Vacatures,
  Form: FormScreen,
  'Visit Card': VisitCard,
  'Case Items': CaseItems,
  'Post Items': PostItems,
  Blog_block: PostContent,
  'Blog Image': InTextImage,
  'Blog Table': Table,
  'Table of content': TableOfContents,
  similar_posts: SimilarPosts,
  'Share Links': ShareLinks,
  Imagery,
  'List with icons': ListWithIcons,
}

interface IProps {
  blok: any
  context?: any
  location?: TLocation
}

const TemplateDynamicComponent: React.FC<IProps> = ({ blok, location }) => (
  <DynamicComponent Components={Components} blok={blok} location={location} />
)

export default TemplateDynamicComponent
