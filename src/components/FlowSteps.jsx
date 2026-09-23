import { Fragment } from 'react'
import { solidBg } from '../data/colors'

export default function FlowSteps({ steps }) {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-center">
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <div className="w-full max-w-[220px] text-center">
            <div className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-full text-lg font-bold text-white ${solidBg[step.color]}`}>{i + 1}</div>
            <h4 className="font-semibold text-white">{step.title}</h4>
            <p className="text-sm text-slate-400">{step.desc}</p>
          </div>
          {i < steps.length - 1 && (
            <span className="text-2xl text-slate-500 md:mt-3" aria-hidden="true">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
