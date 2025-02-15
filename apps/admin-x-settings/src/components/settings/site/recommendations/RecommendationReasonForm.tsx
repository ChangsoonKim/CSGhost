import Form from '../../../../admin-x-ds/global/form/Form';
import Heading from '../../../../admin-x-ds/global/Heading';
import Hint from '../../../../admin-x-ds/global/Hint';
import React from 'react';
import RecommendationIcon from './RecommendationIcon';
import TextArea from '../../../../admin-x-ds/global/form/TextArea';
import TextField from '../../../../admin-x-ds/global/form/TextField';
import URLTextField from '../../../../admin-x-ds/global/form/URLTextField';
import {EditOrAddRecommendation, Recommendation} from '../../../../api/recommendations';
import {ErrorMessages} from '../../../../hooks/useForm';

interface Props<T extends EditOrAddRecommendation> {
    showURL?: boolean,
    formState: T,
    errors: ErrorMessages,
    updateForm: (fn: (state: T) => T) => void
}

const RecommendationReasonForm: React.FC<Props<EditOrAddRecommendation | Recommendation>> = ({showURL, formState, updateForm, errors}) => {
    return <Form
        marginBottom={false}
        marginTop
    >
        <div>
            <Heading className='mb-2 block text-2xs font-semibold uppercase tracking-wider' grey={true} level={6}>Preview</Heading>
            <a className='flex items-center justify-between rounded-sm border border-grey-300 p-3' href={formState.url} rel="noopener noreferrer" target="_blank">
                <div className='flex flex-col gap-[2px]'>
                    <div className="flex items-center gap-2">
                        <RecommendationIcon {...formState} />
                        <span className='line-clamp-1 text-[1.6rem] font-semibold text-grey-900'>{formState.title}</span>
                    </div>
                    {formState.reason && <span className='pl-[29px] text-[1.35rem] leading-snug text-grey-700'>{formState.reason}</span>}
                </div>
                {formState.one_click_subscribe && <span className='flex whitespace-nowrap pl-6 text-md font-semibold text-green'>Subscribe</span>}
            </a>
            {formState.one_click_subscribe && <Hint>This is a Ghost site, so your readers can subscribe with just one click</Hint>}
        </div>

        {showURL && <URLTextField
            disabled={true}
            title='URL'
            value={formState.url}
            onChange={u => updateForm((state) => {
                return {
                    ...state,
                    url: u
                };
            })}
        />}

        <TextField
            error={Boolean(errors.title)}
            hint={errors.title}
            title="Title"
            value={formState.title ?? ''}
            onChange={e => updateForm(state => ({...state, title: e.target.value}))}
        />
        <TextArea
            clearBg={true}
            hint='Optional, try to keep it under 156 characters'
            rows={3}
            title="Short description"
            value={formState.reason ?? ''}
            onChange={e => updateForm(state => ({...state, reason: e.target.value}))}
        />
    </Form>;
};

export default RecommendationReasonForm;
