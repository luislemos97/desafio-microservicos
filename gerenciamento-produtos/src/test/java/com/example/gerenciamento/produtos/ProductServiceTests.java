package com.example.gerenciamento.produtos;

import com.example.gerenciamento.produtos.model.Product;
import com.example.gerenciamento.produtos.repository.ProductRepository;
import com.example.gerenciamento.produtos.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.util.StringUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductServiceTests {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // ----------- CASOS VÁLIDOS ----------------

    @Test
    public void whenValidProduct_thenSaveAndReturnProduct() {
        Product valid = new Product();
        valid.setNome("Produto Válido");
        valid.setDescricao("Uma descrição");
        valid.setPreco(100.0);
        valid.setQuantidade(10);

        when(productRepository.save(valid)).thenReturn(valid);

        Product saved = productService.save(valid);
        assertEquals("Produto Válido", saved.getNome());
        verify(productRepository, times(1)).save(valid);
    }

    @Test
    public void whenFindById_thenReturnProduct() {
        Product p = new Product();
        p.setId(1L);
        p.setNome("Teste");
        p.setDescricao("desc");
        p.setPreco(50.0);
        p.setQuantidade(5);

        when(productRepository.findById(1L)).thenReturn(Optional.of(p));

        Optional<Product> found = productService.findById(1L);
        assertTrue(found.isPresent());
        assertEquals("Teste", found.get().getNome());
    }

    // ----------- CASOS INVÁLIDOS ----------------

    @Test
    public void whenProductIsNull_thenThrowException() {
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> productService.save(null)
        );
        assertEquals("Produto não pode ser nulo", ex.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    public void whenNameIsNull_thenThrowException() {
        Product p = new Product();
        p.setNome(null);
        p.setDescricao("desc");
        p.setPreco(20.0);
        p.setQuantidade(2);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> productService.save(p)
        );
        assertEquals("Nome do produto é obrigatório", ex.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    public void whenNameIsEmpty_thenThrowException() {
        Product p = new Product();
        p.setNome("");
        p.setDescricao("desc");
        p.setPreco(20.0);
        p.setQuantidade(2);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> productService.save(p)
        );
        assertEquals("Nome do produto é obrigatório", ex.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    public void whenPriceIsNegative_thenThrowException() {
        Product p = new Product();
        p.setNome("Teste");
        p.setDescricao("desc");
        p.setPreco(-10.0);
        p.setQuantidade(2);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> productService.save(p)
        );
        assertEquals("Preço do produto não pode ser negativo ou nulo", ex.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    public void whenPriceIsNull_thenThrowException() {
        Product p = new Product();
        p.setNome("Teste");
        p.setDescricao("desc");
        p.setPreco(null);
        p.setQuantidade(2);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> productService.save(p)
        );
        assertEquals("Preço do produto não pode ser negativo ou nulo", ex.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    public void whenQuantityIsNegative_thenThrowException() {
        Product p = new Product();
        p.setNome("Teste");
        p.setDescricao("desc");
        p.setPreco(10.0);
        p.setQuantidade(-5);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> productService.save(p)
        );
        assertEquals("Quantidade do produto não pode ser negativa ou nula", ex.getMessage());
        verify(productRepository, never()).save(any());
    }

    @Test
    public void whenQuantityIsNull_thenThrowException() {
        Product p = new Product();
        p.setNome("Teste");
        p.setDescricao("desc");
        p.setPreco(10.0);
        p.setQuantidade(null);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> productService.save(p)
        );
        assertEquals("Quantidade do produto não pode ser negativa ou nula", ex.getMessage());
        verify(productRepository, never()).save(any());
    }
}
