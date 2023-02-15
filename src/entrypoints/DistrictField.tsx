import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, SelectField } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import { buildClient } from '@datocms/cma-client-browser';

export type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};

export type DistrictOption = {
  label: string,
  value: string
}

export default function DistrictField({ ctx }: PropTypes) {

  const [options, setOptions] = useState<DistrictOption[] | undefined>()
  const [value, setValue] = useState<DistrictOption | undefined>()
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {

    const client = buildClient({ apiToken: ctx.currentUserAccessToken as string })
    const currentValue = ctx.formValues[ctx.field.attributes.api_key];

    client.items.list({ filter: { type: 'district' } }).then((districts) => {

      const options = districts.map(({ id, name }) => ({ value: id as string, label: name as string }))

      setOptions(options)
      console.log(options)

      if (currentValue)
        setValue(options.find(({ value }) => value === currentValue))
      else {
        const email = ctx.currentUser.attributes.email
        setValue(options.find(({ value, label }) => label.toLowerCase() === email))
      }
    }).catch(err => setError(err))

  }, [setOptions])

  useEffect(() => {
    ctx.setFieldValue(ctx.field.attributes.api_key, value?.value)
  }, [value])

  console.log(ctx)
  return (
    <Canvas ctx={ctx}>
      <SelectField
        id="district"
        name="district"
        label=""
        value={value}
        selectInputProps={{ isMulti: false, options }}
        onChange={(newValue) => { setValue(newValue as DistrictOption) }}
      />
      {error && <div>Error: {error.message}</div>}
    </Canvas>
  )

}