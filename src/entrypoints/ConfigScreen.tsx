import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, ContextInspector } from 'datocms-react-ui';
import s from './styles.module.scss';

type Props = {
  ctx: RenderConfigScreenCtx;
};

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
      District selector plugin
    </Canvas>
  );
}
