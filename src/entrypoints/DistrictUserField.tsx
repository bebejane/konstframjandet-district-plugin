import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, SelectField } from 'datocms-react-ui';
import { useEffect, useState } from 'react';

export type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};

export type DistrictUserOption = {
  label: string,
  value: string
}

export default function DistrictUserField({ ctx }: PropTypes) {

  const [options, setOptions] = useState<DistrictUserOption[] | undefined>()
  const [value, setValue] = useState<DistrictUserOption | undefined>()
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {

    const currentValue = ctx.formValues[ctx.field.attributes.api_key];
    const options: DistrictUserOption[] = []
    Object.keys(ctx.users).forEach(k => options.push({ label: ctx.users[k]?.attributes.email as string, value: ctx.users[k]?.attributes.email as string }))

    setOptions(options)

    if (currentValue && options.find(({ value }) => value === currentValue)) {
      console.log('set current value', options.find(({ value }) => value === currentValue))
      setValue(options.find(({ value }) => value === currentValue))
    }

  }, [setOptions, ctx])

  useEffect(() => {
    value && ctx.setFieldValue(ctx.field.attributes.api_key, value?.value)
  }, [value, ctx])

  return (
    <Canvas ctx={ctx}>
      <SelectField
        id="district-user"
        name="district-user"
        label=""
        value={value}
        selectInputProps={{ isMulti: false, options }}
        onChange={(newValue) => { setValue(newValue as DistrictUserOption) }}
      />
      {error && <div>Error: {error.message}</div>}
    </Canvas>
  )

}