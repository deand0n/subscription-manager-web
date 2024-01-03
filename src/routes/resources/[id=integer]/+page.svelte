<script lang="ts">
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
    import type { Subscriber } from '../../../lib/@types/subscriber';
    import Table from '../../../lib/components/Table.svelte';
    import type { ActionData, PageData } from './$types';
    import { getPricePerSubscriber } from '../../../lib/helpers/getPricePerSubscriber';

    export let data: PageData;
    export let form: ActionData;

    let subscribers = data.resource.subscribers ?? [];
    let pricePerSubscriber: number;

    const modalStore = getModalStore();

    const onCreate = () => {
        const modalSettings: ModalSettings = {
            type: 'component',
            component: 'createSubscriberModal',
            meta: { resource_id: data.resource.id },
            response: (subscriber: Subscriber) => {
                subscribers = [...subscribers, subscriber];
                calculatePricePerSubscriber();
            },
        };
        modalStore.trigger(modalSettings);
    };

    const onEdit = (subscriber: Subscriber) => {
        const modalSettings: ModalSettings = {
            type: 'component',
            component: 'editSubscriberModal',
            meta: { subscriber: subscriber },
            response: (newSubscriber?: Subscriber) => {
                if (!newSubscriber) {
                    return;
                }

                const oldSubIndex = subscribers.findIndex((sub) => sub.id === newSubscriber.id)!;

                subscribers[oldSubIndex].description = newSubscriber.description;
            },
        };
        modalStore.trigger(modalSettings);
    };
    const onDeleteSelected = (subscriberList: Subscriber[]) => {
        fetch(`/api/subscribers/delete`, {
            method: 'PUT',
            body: JSON.stringify(subscriberList),
        }).then(() => {
            const filteredArray = subscribers.filter(
                (obj1) => !subscriberList.some((obj2) => obj2.id === obj1.id),
            );

            subscribers = filteredArray;
        });
    };

    const calculatePricePerSubscriber = () => {
        if (!subscribers.length) {
            return;
        }

        pricePerSubscriber = getPricePerSubscriber(data.resource.price, subscribers.length);
    };

    calculatePricePerSubscriber();
</script>

<div class="flex gap-7 flex-row flex-wrap items-start">
    <div class="card p-5 w-full lg:w-2/5">
        <form class="form flex flex-col gap-6" method="post" action="?/update">
            <div class="flex flex-col">
                <label for="name" class="block"> Name </label>
                <input required class="input" name="name" value={data.resource.name} />
            </div>
            <div class="flex flex-col">
                <label for="price" class="block"> Price </label>
                <input
                    required
                    class="input"
                    name="price"
                    type="number"
                    value={data.resource.price}
                />
            </div>
            <div class="flex flex-col">
                <label class="label" for="billing_start"> Billing start </label>
                <input type="date" class="input" name="billing_start" />
            </div>
            <div class="flex flex-col">
                <label class="label" for="description"> Description </label>
                <textarea class="textarea" name="description">{data.resource.description}</textarea>
            </div>
            <div class="flex flex-col">
                <label class="label" for="frequency"> Frequency </label>
                <select class="select" name="frequency" value={data.resource.frequency}>
                    <option value="">Please select an option</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                </select>
            </div>
            <button class="btn btn-md variant-filled-primary">Submit</button>

            <div class="flex justify-end">
                {#if form?.success}
                    <p>success</p>
                {:else if form && !form.success}
                    <p>Error: {form.message}</p>
                {/if}
                <div>Created at: {data.resource.created_at.toLocaleString()}</div>
            </div>
        </form>
    </div>

    <div class="grow">
        <h3 class="h3">Subscribers:</h3>
        <div class="flex flex-col gap-5">
            <Table
                data={subscribers}
                keyLabel={[
                    { key: 'description', label: 'Description' },
                    { key: 'user_full_name', label: 'User Name' },
                ]}
                {onCreate}
                {onEdit}
                {onDeleteSelected}
            />
            {#if pricePerSubscriber}
                <div class="alert variant-ghost">
                    Price per subscriber: {pricePerSubscriber} uah
                </div>
            {/if}
        </div>
    </div>
</div>
