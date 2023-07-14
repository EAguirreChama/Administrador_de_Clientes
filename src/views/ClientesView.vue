<script setup>
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios';
    import RouterLink from '../components/UI/RouterLink.vue';
    import Heading from '../components/UI/Heading.vue';

    const clientes = ref([])

    onMounted(() => {
        axios('http://localhost:4000/clientes')
            .then(({data}) => clientes.value = data)
            .catch(error => console.log('Hubo un error'))
    })

    defineProps({
        titulo: {
            type: String
        }
    })

    const existenClientes = computed(() => {
        return clientes.value.length > 0
    })
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="agregar-cliente">
                Agrgar Cliente
            </RouterLink>
        </div>

        <Heading>{{ titulo }}</Heading>

        <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        <p v-else class="text-center mt-10">Aún no se registran Clientes</p>
    </div>
</template>