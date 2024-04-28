import React from 'react'

type Props = {
  key?: number
  icon: React.ReactNode
  link?: string
  title: string
  description: string
}

const Card = (props: Props) => {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border border-navy-300 px-8 pb-12 pt-8"
      key={props.key ? props.key : null}
    >
      <div className="flex w-full items-center justify-start gap-8">
        {props.icon}
        <a
          className="text-3xl font-semibold text-light-blue-300"
          href={props.link}
        >
          {' '}
          {props.title}
        </a>
      </div>
      <p className="text-xl text-light-blue-500"> {props.description}</p>
    </div>
  )
}

export default Card
