<script setup>
    import ClienteService from '../services/ClienteService';

    import { FormKit } from '@formkit/vue';
    import { useRouter, useRoute } from 'vue-router'
    import { onMounted, reactive } from 'vue';

    import RouterLink from '../components/UI/RouterLink.vue';
    import Heading from '../components/UI/Heading.vue';

    defineProps({
        titulo: {
            type: String
        }
    })

    const router = useRouter()
    const route = useRoute()

    const { id } = route.params

    const formData = reactive({}) // PUEDO HACERLO CON REF == formData.value = data

    onMounted(() => {
        ClienteService.obtenerCliente(id)
        .then(({data}) => {
            Object.assign(formData, data)
        })
        .catch(error => console.log(error))
    })

    const handleSubmit = (data) => {
        ClienteService.actualizarCliente(id, data)
            .then(() => router.push({ name: 'inicio'}))
            .catch(error => console.log(error))
    }
    
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="inicio">
                Volver a Inicio
            </RouterLink>
        </div>

        <Heading>{{ titulo }}</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit 
                    type="form" 
                    submit-label="Actualizar Cliente" 
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="handleSubmit"
                    :value="formData"
                >

                    <FormKit
                        type="text"
                        label="Nombre"
                        name="Nombre"
                        placeholder="Nombre del Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Nombre del Cliente es Obligatorio' }"
                        v-model="formData.Nombre"
                    />

                    <FormKit
                        type="text"
                        label="Apellido"
                        name="Apellido"
                        placeholder="Apellido del Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Apellido del Cliente es Obligatorio' }"
                        v-model="formData.Apellido"
                    />

                    <FormKit
                        type="text"
                        label="Email"
                        name="Email"
                        placeholder="Email del Cliente"
                        validation="required|email"
                        :validation-messages="{ required: 'El Email del Cliente es Obligatorio' , email: 'Coloca un Email válido'}"
                        v-model="formData.Email"
                    />

                    <FormKit
                        type="text"
                        label="Teléfono"
                        name="Teléfono"
                        placeholder="Teléfono: XXX-XXX-XXXX"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{ matches: 'El Formato no es válido'}"
                        v-model="formData.Teléfono"
                    />

                    <FormKit
                        type="text"
                        label="Empresa"
                        name="Empresa"
                        placeholder="Empresa del Cliente"
                        v-model="formData.Empresa"
                    />
                    
                    <FormKit
                        type="text"
                        label="Puesto"
                        name="Puesto"
                        placeholder="Puesto del Cliente"
                        v-model="formData.Puesto"
                    />

                </FormKit>
            </div>
        </div>
    </div>
</template>

<style>
    .formkit-wrapper {
        max-width: 100%;
    }
</style>