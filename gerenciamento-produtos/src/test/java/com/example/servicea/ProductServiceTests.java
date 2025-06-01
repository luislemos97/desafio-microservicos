package com.example.servicea;

import com.example.servicea.model.Product;
import com.example.servicea.repository.ProductRepository;
import com.example.servicea.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class ProductServiceTests {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    public ProductServiceTests() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void whenSaveProduct_thenReturnProduct() {
        Product product = new Product();
        product.setNome("Test");
        when(productRepository.save(product)).thenReturn(product);

        Product saved = productService.save(product);
        assertEquals("Test", saved.getNome());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    public void whenFindById_thenReturnProduct() {
        Product product = new Product();
        product.setId(1L);
        product.setNome("Test");
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Optional<Product> found = productService.findById(1L);
        assertTrue(found.isPresent());
        assertEquals("Test", found.get().getNome());
    }
}