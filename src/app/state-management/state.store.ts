import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { StateModel } from "./state.model.type"
import { computed } from "@angular/core"

type State = {
    item: StateModel
}

const initialState: State = {
    item: {
        pedidosList: [],
    }
}

export const PedidosStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withComputed(({ item }) => ({
    pedidos: computed(() => item.pedidosList())
  })),
  withMethods(store => ({
    addPedido(pedido: any){
        patchState(store, {
            item: {
                ...store.item(),
                pedidosList: [...store.pedidos(), pedido]
            }
        })
    }
    
  }))
);